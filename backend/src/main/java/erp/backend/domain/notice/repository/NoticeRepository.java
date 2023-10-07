package erp.backend.domain.notice.repository;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Optional<Notice> findByNoticeIdAAndEmp(Long id, Emp emp);
}
