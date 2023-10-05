package erp.backend.domain.board.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDetailResponse {
    private Long boardId;
    private String writer;
    private String subject;
    private String content;
    private int views;
    private LocalDateTime boardCreatedDate;
    private LocalDateTime boardModifiedDate;
}
