package erp.backend.domain.log.repository;

import erp.backend.domain.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<Log, Long> {
    List<Log> findByEmpEmpId(Long empId);
}