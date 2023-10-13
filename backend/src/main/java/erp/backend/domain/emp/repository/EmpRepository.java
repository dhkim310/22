package erp.backend.domain.emp.repository;

import erp.backend.domain.emp.dto.EmpListResponse;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.salary.entity.Salary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpRepository extends JpaRepository<Emp, Long> {
    Optional<Emp> findByEmpEmail(String empEmail);
    Emp findByEmpName(String empName);
    Emp findByEmpId(Long empId);
    Page<Emp> findByEmpNameContainingOrderByEmpIdAsc(Pageable pageable, String empName);
    Page<Emp> findByOrderByEmpIdAsc(Pageable pageable);
}
