package erp.backend.domain.notice.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeInsert;
import erp.backend.domain.notice.dto.NoticeUpdate;
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

    @Transactional
    public Long noticeUpdate(Long id, NoticeUpdate request) {
        Emp emp = SecurityHelper.getAccount();
        Notice entity = getNotice(id);
        Long empId = entity.getEmp().getEmpId();
        if (emp.getEmpId() != empId) {
            return -1L;
        } else {
            entity.update(request);
        }
        return entity.getNoticeId();
    }

    @Transactional
    public Boolean noticeDelete(Long id) {
        // 현재 로그인 된 사용자와 게시글의 작성자가 일치하면 글 삭제
        Emp emp = SecurityHelper.getAccount(); // 현재 로그인 된 사용자 확인
        Notice entity = getNotice(id); // 게시글 정보 확인
        Long empId = entity.getEmp().getEmpId(); // 게시글의 작성자 확인
        if (emp.getEmpId() != empId) {
            return false;
        } else {
            noticeRepository.deleteById(id);
            return true;
        }
    }

    private Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(id + "번 글은 존재하지 않는 데이터입니다."));
    }
}
