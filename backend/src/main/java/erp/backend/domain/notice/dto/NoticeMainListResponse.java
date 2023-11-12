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
public class NoticeMainListResponse {
    private Long id;
    private String subject;
    private int views;
    private String writer;
    private LocalDateTime createdDate;
}