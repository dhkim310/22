package erp.backend.domain.board.service;


import erp.backend.domain.board.dto.*;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public Long boardInsert(BoardInsert request) {
        // 사원 id
        Emp emp = SecurityHelper.getAccount();
        Board entity = Board.builder()
                .emp(emp)
                .boardSubject(request.getSubject())
                .boardContent(request.getContent())
                .boardViews(0)
                .boardCreatedDate(LocalDateTime.now())
                .build();
        return boardRepository.save(entity).getBoardId();
    }

    @Transactional
    public void boardDelete(BoardDelete request) {
        boardRepository.deleteById(request.getBoardId());
    }

    @Transactional
    public BoardDetailResponse getBoardDetail(Long id) {
        Board entity = getBoard(id);
        // 상세보기 클릭시 조회수 1 증가
        int view = entity.updateViewCount(entity.getBoardViews()).getBoardViews();
        return BoardDetailResponse.builder()
                .boardId(entity.getBoardId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getBoardSubject())
                .content(entity.getBoardContent())
                .views(view)
                .boardCreatedDate(entity.getBoardCreatedDate())
                .boardModifiedDate(entity.getBoardModifiedDate())
                .build();
    }

    @Transactional
    public Long boardUpdate(Long id, BoardUpdate request) {
        Emp emp = SecurityHelper.getAccount();
        Board entity = getBoard(id);
        Long empId = entity.getEmp().getEmpId();
        if (emp.getEmpId() == empId) {
            entity.update(request);
        } else {
            return -1L;
        }
        return entity.getBoardId();
    }

    @Transactional
    public Page<Board> findAll(Pageable pageable) {
        System.out.println("@findAll() pageable: " + pageable);
        return boardRepository.findByOrderByBoardIdDesc(pageable);
    }

    @Transactional
    public BoardListResult getBoardListResult(Pageable pageable) {
        Page<Board> list = findAll(pageable);
        int page = pageable.getPageNumber();
        long totalCount = boardRepository.count();
        int size = pageable.getPageSize();
        System.out.println("@getBoardListResult() page: "+page+", totalCount: "+totalCount+", size: "+size);
        return new BoardListResult(page, totalCount, size, list);
    }

    private Board getBoard(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
    }
}
