package erp.backend.domain.salary.repository;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.salary.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
    List<Salary> findSalaryByEmpEmpId(Long empId);

}
