package erp.backend.domain.emp.repository;

import erp.backend.domain.emp.entity.Emp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpRepository extends JpaRepository<Emp, Long> {
    Optional<Emp> findByEmpEmail(String empEmail);
    Emp findByEmpName(String empName);
}
