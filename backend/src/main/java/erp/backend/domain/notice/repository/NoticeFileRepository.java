package erp.backend.domain.notice.repository;

import erp.backend.domain.notice.entity.NoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeFileRepository extends JpaRepository<NoticeFile, Long> {
}