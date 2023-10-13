package erp.backend.domain.comment.dto;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.emp.entity.Emp;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentRequest {
    private String comment;
}