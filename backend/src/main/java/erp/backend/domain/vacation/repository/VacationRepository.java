package erp.backend.domain.vacation.repository;

import erp.backend.domain.vacation.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Vacation findByVacationId(long vacationId);

    List<Vacation> findVacationsByEmpEmpId(Long empId);
}
