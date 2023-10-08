package erp.backend.domain.notice.repository;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

}
