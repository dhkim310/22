package erp.backend.domain.memo.repository;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.entity.Memo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    Memo findTopByEmpEmpIdOrderByMemoIdDesc(long empId);

    void deleteById(long memoId);
}
