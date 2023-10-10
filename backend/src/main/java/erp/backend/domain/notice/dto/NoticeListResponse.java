package erp.backend.domain.notice.dto;

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
    private LocalDateTime noticeCreatedDate; //작성일
}
