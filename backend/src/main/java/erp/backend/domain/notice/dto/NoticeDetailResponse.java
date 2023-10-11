package erp.backend.domain.notice.dto;

import erp.backend.domain.notice.entity.NoticeFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailResponse {
    private Long id; // 글 번호
    private String writer; // 작성자
    private String subject; // 제목
    private String content; // 내용
    private int views; //조회수
    private LocalDateTime noticeCreatedDate; // 작성일
    private LocalDateTime noticeModifiedDate; // 수정일
    private List<NoticeFile> noticeFileList; // 파일

}
