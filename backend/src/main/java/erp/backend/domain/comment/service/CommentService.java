package erp.backend.domain.comment.service;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.comment.repository.CommentRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public Long commentInsert(Long boardId, CommentRequest request) {
        Emp emp = SecurityHelper.getAccount();
        Board thisBoard = boardRepository.findByBoardId(boardId);
        Comment entity = Comment.builder()
                .board(thisBoard)
                .emp(emp)
                .commentComment(request.getComment())
                .commentCreatedDate(LocalDateTime.now())
                .build();
        commentRepository.save(entity);
        return entity.getCommentId();
    }

    @Transactional
    public void commentDelete(Long boardId, Long commentId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        commentOptional.ifPresent(comment -> {
            if (comment.getBoard().getBoardId() == (boardId))
                commentRepository.deleteById(commentId);
        });
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> commentList(Long boardId) {
        List<Comment> comments = commentRepository.findByBoardBoardId(boardId);
        List<CommentResponse> commentResponses = new ArrayList<>();

        for (Comment comment : comments) {
            commentResponses.add(new CommentResponse(comment));
        }

        return commentResponses;
    }

    @Transactional(readOnly = true)
    public List<Comment> commentSelect(Long boardId){
        List<Comment> list = commentRepository.findByBoardBoardId(boardId);

        return list;
    }
}
