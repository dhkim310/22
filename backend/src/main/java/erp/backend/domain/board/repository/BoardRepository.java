package erp.backend.domain.board.repository;

import erp.backend.domain.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByBoardId(Long boardId);
}