package erp.backend.domain.memo.repository;

import erp.backend.domain.memo.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    Memo findTopByEmpEmpIdOrderByMemoIdDesc(long empId);

}
