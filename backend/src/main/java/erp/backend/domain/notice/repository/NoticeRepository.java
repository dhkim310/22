package erp.backend.domain.notice.repository;

import erp.backend.domain.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findByOrderByNoticeIdDesc(Pageable pageable);
    List<Notice> findTop4ByOrderByNoticeIdDesc();
    Notice findByNoticeId(Long id);

}
