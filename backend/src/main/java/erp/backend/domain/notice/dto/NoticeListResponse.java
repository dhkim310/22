package erp.backend.domain.notice.dto;

import erp.backend.domain.notice.entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeListResponse {
    private Long id; // 글 번호
    private String writer; //작성자
    private String subject; // 제목
    private int views; // 조회수
    private LocalDateTime noticeCreatedDate; // 작성일
    private LocalDateTime noticeModifiedDate; // 수정일

    public static NoticeListResponse fromNotice(Notice notice) {
        return NoticeListResponse.builder()
                .id(notice.getNoticeId())
                .writer(notice.getEmp().getEmpName())
                .subject(notice.getNoticeSubject())
                .views(notice.getNoticeViews())
                .noticeCreatedDate(notice.getNoticeCreatedDate())
                .noticeModifiedDate(notice.getNoticeModifiedDate())
                .build();
    }
}
