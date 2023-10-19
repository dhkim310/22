package erp.backend.domain.board.dto;

import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.uploadfile.entity.UploadFile;
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
public class BoardDetailResponse {
    private Long boardId;
    private String writer;
    private String subject;
    private String content;
    private int views;
    private LocalDateTime boardCreatedDate;
    private LocalDateTime boardModifiedDate;
    private List<UploadFile> boardFileList;
    private List<CommentResponse> boardCommentList;
}
