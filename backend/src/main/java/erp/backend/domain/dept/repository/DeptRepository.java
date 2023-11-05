package erp.backend.domain.dept.repository;

import erp.backend.domain.dept.entity.Dept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeptRepository extends JpaRepository<Dept, Long> {
    Long findByDeptId(Long deptId);
}

