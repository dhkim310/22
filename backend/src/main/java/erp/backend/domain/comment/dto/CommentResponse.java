package erp.backend.domain.comment.dto;

import erp.backend.domain.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long commentId;
    private String comment;
    private Long boardId;
    private String writer;
    private LocalDateTime createdDate;

    //entity에서 dto로 응답
    public CommentResponse(Comment comment) {
        this.commentId = comment.getCommentId();
        this.comment = comment.getCommentComment();
        this.createdDate = comment.getCommentCreatedDate();
        this.writer = comment.getEmp().getEmpName();
        this.boardId = comment.getBoard().getBoardId();
    }
}