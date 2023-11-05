package erp.backend.domain.notice.repository;

import erp.backend.domain.notice.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findTop4ByOrderByNoticeIdDesc();

}
