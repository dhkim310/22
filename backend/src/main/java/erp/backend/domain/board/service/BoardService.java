package erp.backend.domain.board.service;


import erp.backend.domain.board.dto.BoardDelete;
import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.board.dto.BoardInsert;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

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

    private Board getBoard(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
    }

}
