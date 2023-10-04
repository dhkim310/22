package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.CreateNotice;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.notice.repository.NoticeRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    public Long createNotice(CreateNotice request) {
        // 사원 id
        Emp emp = SecurityHelper.getAccount();
        System.out.println(emp.toString());
        Notice entity = Notice.builder()
                .emp(emp)
                .noticeSubject(request.getSubject())
                .noticeContent(request.getContent())
                .noticeViews(1)
                .noticeCreatedDate(LocalDateTime.now())
                .build();
        return noticeRepository.save(entity).getNoticeId();
    }

}
