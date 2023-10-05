package erp.backend.domain.log.repository;

import erp.backend.domain.log.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogRepository extends JpaRepository<Log, Long> {

    //Log findTopByOrderByLogIdDesc();
    //Log findTopByOrderByLogIdDescAndFindByEmpEmpId(Long id);
    //Log findByEmpEmpId(Long id);

}
