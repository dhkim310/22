package erp.backend.domain.comment.dto;

import erp.backend.domain.comment.entity.Comment;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponse {

    private final Long commentId;
    private final String comment;
    private final Long boardId;
    private final String writer;
    private final LocalDateTime createdDate;

    //entity에서 dto로 응답
    public CommentResponse(Comment comment) {
        this.commentId = comment.getCommentId();
        this.comment = comment.getCommentComment();
        this.createdDate = comment.getCommentCreatedDate();
        this.writer = comment.getEmp().getEmpName();
        this.boardId = comment.getBoard().getBoardId();
    }
}
