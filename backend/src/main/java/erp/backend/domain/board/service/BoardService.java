package erp.backend.domain.board.service;

import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.board.dto.BoardListResult;
import erp.backend.domain.board.dto.BoardRequest;
import erp.backend.domain.board.dto.BoardUpdate;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.entity.BoardFile;
import erp.backend.domain.board.repository.BoardFileRepository;
import erp.backend.domain.board.repository.BoardQueryDsl;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.comment.repository.CommentRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.FileUtils;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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
    private final CommentRepository commentRepository;

    private final UploadFileService uploadFileService;

    private final BoardQueryDsl boardQueryDsl;

    //TODO : 기본 Null 검색 버튼 클릭시 keyword
    @Transactional(readOnly = true)
    public BoardListResult boardSearchListResult(String keyword, PageRequest pageRequest) {
        return BoardListResult.from(
                boardQueryDsl.searchBoardList(keyword, pageRequest)
        );
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
        List<UploadFile> uploadFileList = null;
        List<Comment> comments = commentRepository.findByBoardBoardIdOrderByCommentIdDesc(id);
        List<CommentResponse> commentResponses = new ArrayList<>();

        // 권한 정보 로직 추가 수정버튼 표시
        Emp emp = SecurityHelper.getAccount();
        boolean hasPermission = emp.getEmpId().equals(entity.getEmp().getEmpId()) || emp.getRoles().startsWith("ROLE_ADMIN");

        if (!boardFiles.isEmpty())
            uploadFileList = uploadFileService.fileList(id, SchemaType.board);

        for (Comment comment : comments) {
            commentResponses.add(new CommentResponse(comment));
        }

        return BoardDetailResponse.builder()
                .boardId(entity.getBoardId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getBoardSubject())
                .content(entity.getBoardContent())
                .views(entity.getBoardViews())
                .boardCreatedDate(entity.getBoardCreatedDate())
                .boardModifiedDate(entity.getBoardModifiedDate())
                .boardFileList(uploadFileList)
                .boardCommentList(commentResponses)
                .hasPermission(hasPermission)
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
        Board entity = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
        if (entity.getEmp().getEmpId().equals(emp.getEmpId())) {
            return entity;
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