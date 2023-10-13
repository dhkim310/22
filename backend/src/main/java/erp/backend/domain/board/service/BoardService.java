package erp.backend.domain.board.service;


import erp.backend.domain.board.dto.*;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.entity.BoardFile;
import erp.backend.domain.board.repository.BoardFileRepository;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static erp.backend.global.util.ArrayUtils.isNullOrEmpty;
import static erp.backend.global.util.FileUtils.generatorFilePath;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;

    private final UploadFileService uploadFileService;

    @Transactional(readOnly = true)
    public BoardListResult boardListResult(Pageable pageable) {
        List<Board> list = boardRepository.findAll();
        List<BoardListResponse> boardListResponses = new ArrayList<>();

        for (Board board : list) {
            BoardListResponse response = BoardListResponse.fromBoard(board);
            boardListResponses.add(response);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), boardListResponses.size());
        List<BoardListResponse> sublist = boardListResponses.subList(start, end);

        Page<BoardListResponse> page = new PageImpl<>(sublist, pageable, boardListResponses.size());

        return new BoardListResult(pageable.getPageNumber(), boardListResponses.size(), pageable.getPageSize(), page);
    }

    @Transactional
    public Long boardInsert(BoardRequest request, List<MultipartFile> files) throws IOException {
        // 사원 id
        Emp emp = SecurityHelper.getAccount();
        Board entity = Board.builder()
                .emp(emp)
                .boardSubject(request.getSubject())
                .boardContent(request.getContent())
                .build();
        boardRepository.save(entity);

        createBoardFileList(entity, files);

        return entity.getBoardId();
    }

    @Transactional(readOnly = true)
    public BoardDetailResponse boardDetail(Long id) {
        Board entity = getBoard(id);
        List<BoardFile> boardFiles = entity.getBoardFileList();

        return BoardDetailResponse.builder()
                .boardId(entity.getBoardId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getBoardSubject())
                .content(entity.getBoardContent())
                .views(entity.getBoardViews())
                .boardCreatedDate(entity.getBoardCreatedDate())
                .boardModifiedDate(entity.getBoardModifiedDate())
                .boardFileList(boardFiles)
                .build();
    }

    @Transactional
    public Long boardUpdate(Long id, BoardUpdate request, List<MultipartFile> files) {
        Emp emp = SecurityHelper.getAccount();
        Board entity = getBoard(id, emp);
        entity.update(request);

        List<Long> deleteUploadFileIds = request.getDeleteUploadFileIds();

        if (deleteUploadFileIds != null || !entity.getBoardFileList().isEmpty()) {
            List<BoardFile> boardFileList = entity.getBoardFileList();
            boardFileList.removeIf(boardFile -> deleteUploadFileIds != null && deleteUploadFileIds.contains(boardFile.getBoardFileId()));
        }

        if (files != null && !files.isEmpty()) {
            List<BoardFile> newFiles = createBoardFileList(entity, files);
            entity.getBoardFileList().clear(); // 현재 파일 목록을 모두 지우고
            entity.getBoardFileList().addAll(newFiles); // 새로운 파일 목록으로 교체
        } else {
            // files가 null이면 해당 공지사항 원래 있던 파일 삭제
            entity.getBoardFileList().clear();
        }

        return entity.getBoardId();
    }

    @Transactional
    public void boardDelete(Long id) {
        Emp emp = SecurityHelper.getAccount(); // 현재 로그인 된 사용자 확인
        Board entity = getBoard(id, emp);

        // 연결된 파일 정보를 삭제
        List<BoardFile> boardFiles = entity.getBoardFileList();
        for (BoardFile boardFile : boardFiles) {
            // 파일 시스템에서 삭제
            UploadFile uploadFile = boardFile.getUploadFile();
            FileUtils.deleteFile(generatorFilePath(uploadFile.getUuid(), uploadFile.getFschema().getName()));
            // 파일 데이터베이스 테이블에서 삭제
            boardFileRepository.delete(boardFile);
        }

        // 공지사항 삭제
        boardRepository.delete(entity);
    }

    @Transactional
    public List<BoardFile> createBoardFileList(Board board, List<MultipartFile> files) {
        List<BoardFile> boardFileList = new ArrayList<>();

        if (isNullOrEmpty(files)) {
            return boardFileList;
        } else {
            for (MultipartFile file : files) {
                UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.board);
                BoardFile boardFile = new BoardFile(board, uploadFile);
                boardFileList.add(boardFile);
            }
        }
        return boardFileRepository.saveAll(boardFileList);
    }

    // 게시글 존재 여부 확인
    private Board getBoard(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
    }

    // 게시글 작성자와 사용자가 일치하는지 확인
    private Board getBoard(Long id, Emp emp) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
        if (board.getEmp().getEmpId().equals(emp.getEmpId())) {
            return board;
        } else {
            throw new IllegalArgumentException("현재 로그인 된 사용자와 게시글 작성자가 일치하지 않습니다.");
        }
    }

    @Transactional
    public void updateView(Long id) {
        Board entity = getBoard(id);
        entity.updateViewCount();
    }
}
