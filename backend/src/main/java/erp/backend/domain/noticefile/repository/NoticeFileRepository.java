package erp.backend.domain.noticefile.repository;

import erp.backend.domain.noticefile.entity.NoticeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeFileRepository extends JpaRepository<NoticeFile, Long> {
    List<NoticeFile> findAllByNoticeFileId(Long noticeId);

    void deleteAllByNoticeFileId(Long noticeId);
}
