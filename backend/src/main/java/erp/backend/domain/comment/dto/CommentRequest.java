package erp.backend.domain.comment.dto;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.emp.entity.Emp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRequest {
    private long commentId;
    private String comment;
    private Board board;
    private Emp emp;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    //dto에서 entity 요청
    public Comment toEntity() {
        Comment comments = Comment.builder()
            .commentId(commentId)
            .commentComment(comment)
            .board(board)
            .emp(emp)
            .commentCreatedDate(createdDate)
            .commentModifiedDate(modifiedDate)
            .build();
        return comments;
    }
}