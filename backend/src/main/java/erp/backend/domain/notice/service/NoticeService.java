package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeInsert;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
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
    public Long noticeInsert(NoticeInsert request) {
        // 사원 id
        Emp emp = SecurityHelper.getAccount();
        Notice entity = Notice.builder()
                .emp(emp)
                .noticeSubject(request.getSubject())
                .noticeContent(request.getContent())
                .noticeViews(0)
                .noticeCreatedDate(LocalDateTime.now())
                .build();
        return noticeRepository.save(entity).getNoticeId();
    }

    @Transactional
    public NoticeDetailResponse getNoticeDetail(Long id) {
        Notice entity = getNotice(id);
        // 상세보기 클릭시 조회수 1 증가
        int view = entity.updateViewCount(entity.getNoticeViews()).getNoticeViews();
        return NoticeDetailResponse.builder()
                .id(entity.getNoticeId())
                .writer(entity.getEmp().getEmpName())
                .subject(entity.getNoticeSubject())
                .content(entity.getNoticeContent())
                .views(view)
                .noticeCreatedDate(entity.getNoticeCreatedDate())
                .noticeModifiedDate(entity.getNoticeModifiedDate())
                .build();
    }

    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니."));
    }
}
