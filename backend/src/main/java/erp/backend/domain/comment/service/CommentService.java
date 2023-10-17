package erp.backend.domain.comment.service;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.comment.repository.CommentRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public CommentResponse commentInsert(Long boardId, CommentRequest request) {
        Emp emp = SecurityHelper.getAccount();
        Board thisBoard = boardRepository.findByBoardId(boardId);
        Comment entity = Comment.builder()
                .board(thisBoard)
                .emp(emp)
                .commentComment(request.getComment())
                .commentCreatedDate(LocalDateTime.now())
                .build();
        commentRepository.save(entity);
        return CommentResponse.builder()
                .commentId(entity.getCommentId())
                .comment(entity.getCommentComment())
                .boardId(thisBoard.getBoardId())
                .writer(entity.getEmp().getEmpName())
                .createdDate(entity.getCommentCreatedDate())
                .build();
    }

    @Transactional
    public void commentDelete(Long commentId) {
        Emp emp = SecurityHelper.getAccount();
        Comment entity = getComment(commentId, emp);

        commentRepository.delete(entity);
    }

    // 댓글 사용자와 접속자가 같은 지 확인
    private Comment getComment(Long id, Emp emp) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터입니다."));
        if (comment.getEmp().getEmpId().equals(emp.getEmpId())) {
            return comment;
        } else {
            throw new IllegalArgumentException("현재 로그인 된 사용자와 게시글 작성자가 일치하지 않습니다.");
        }
    }
}