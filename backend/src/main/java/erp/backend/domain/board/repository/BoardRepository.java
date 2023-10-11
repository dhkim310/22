package erp.backend.domain.board.repository;

import erp.backend.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findByOrderByBoardIdDesc(Pageable pageable);

    Board findByBoardId(Long boardId);

    List<Board> findByBoardIdAndEmpEmpId(long boardId, long empId);

    List<Board> findByEmpEmpIdContaining(long empId);

}
