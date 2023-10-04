package erp.backend.domain.board.service;

import erp.backend.domain.board.dto.BoardListResult;
import erp.backend.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BoardService {
    List<Board> listS();

    Board insertS(Board board);

    boolean deleteS(long seq);

    Board updateS(Board board);

    List<Board> contentS(String empId);

    Board selectS(long boardCode);

    Page<Board> findAll(Pageable pageable);

    BoardListResult getBoardListResult(Pageable pageable);

}
