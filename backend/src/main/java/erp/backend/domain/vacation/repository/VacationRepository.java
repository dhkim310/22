package erp.backend.domain.vacation.repository;

import erp.backend.domain.vacation.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VacationRepository extends JpaRepository<Vacation, Long> {
    Vacation findByVacationId(long vacationId);
}
