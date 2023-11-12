package erp.backend.domain.dept.repository;

import erp.backend.domain.dept.entity.Dept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeptRepository extends JpaRepository<Dept, Long> {
    Dept findByDeptName(String departmentName);
}