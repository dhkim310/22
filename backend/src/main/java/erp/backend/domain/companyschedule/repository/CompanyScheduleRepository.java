package erp.backend.domain.companyschedule.repository;

import erp.backend.domain.companyschedule.entity.CompanySchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyScheduleRepository extends JpaRepository<CompanySchedule,Long> {
}
