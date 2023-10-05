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
public class NoticeDetailResponse {
    private Long id; // 글 번호
    private String writer; //작성자
    private String subject; // 제목
    private String content; // 내용
    private int views; //조회수
    private LocalDateTime noticeCreatedDate; //작성일
    private LocalDateTime noticeModifiedDate; // 수정일

}
