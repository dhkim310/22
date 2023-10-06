package erp.backend.domain.companyschedule.repository;

import erp.backend.domain.companyschedule.entity.CompanySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyScheduleRepository extends JpaRepository<CompanySchedule,Long> {
    @Query("SELECT n FROM CompanySchedule n")
    List<CompanySchedule> findAll();
}
