package erp.backend.domain.emp.repository;

import erp.backend.domain.emp.dto.EmpListResponse;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.salary.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpRepository extends JpaRepository<Emp, Long> {
    Optional<Emp> findByEmpEmail(String empEmail);
    Emp findByEmpName(String empName);
    List<Emp> findByEmpNameContaining(String empName);
//    List<Emp> findByEmpNameContainingOrEmpIdContainingOrDeptDeptNameContainingOrDeptDeptIdContaining(
//            String empName, Long empId, String deptName, Long deptId);
}
