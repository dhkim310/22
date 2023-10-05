package erp.backend.domain.board.service;


import erp.backend.domain.board.dto.BoardDelete;
import erp.backend.domain.board.dto.BoardInsert;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public Long boardInsert(BoardInsert request) {
        // 사원 id
        Emp emp = SecurityHelper.getAccount();
        System.out.println(emp.toString());
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
    public void boardUpdate(BoardDelete request) {
        Date date = boardRepository.findById(request.getBoardId()).get().getRdate();
        board.setRdate(date);
        boardRepository.save(board);
    }
}
