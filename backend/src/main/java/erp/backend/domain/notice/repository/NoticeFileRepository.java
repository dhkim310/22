package erp.backend.domain.notice.repository;

import erp.backend.domain.notice.entity.NoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeFileRepository extends JpaRepository<NoticeFile, Long> {
    List<NoticeFile> findByNotice_NoticeId(Long id);
}