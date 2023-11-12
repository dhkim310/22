package erp.backend.domain.comment.repository;

import erp.backend.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBoardBoardIdOrderByCommentIdDesc(Long boardId);

}