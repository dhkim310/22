package erp.backend.domain.emp.repository;

import erp.backend.domain.emp.entity.Emp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpRepository extends JpaRepository<Emp, Long> {
    Optional<Emp> findByEmpEmail(String empEmail);
}
