package erp.backend.domain.comment.service;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.repository.BoardRepository;
import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.comment.repository.CommentRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.notice.dto.NoticeMainListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final EmpRepository empRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public long commentInsert(String writer, Long BoardId, CommentRequest dto){
        Emp emp = empRepository.findByEmpName(writer);
        Board board = boardRepository.findByBoardId(BoardId);

        dto.setEmp(emp);
        dto.setBoard(board);

        Comment comment = dto.toEntity();
        commentRepository.save(comment);
        System.out.println(comment.getCommentCreatedDate());
        return dto.getCommentId();
    }

    @Transactional
    public void commentDelete(Long boardId, Long commentId){
        Comment comment = commentRepository.findByBoardBoardIdAndCommentId(boardId, commentId);
        commentRepository.delete(comment);
    }

    @Transactional(readOnly = true)
    public List<Comment> commentSelect(Long boardId){
        List<Comment> list = commentRepository.findByBoardBoardId(boardId);

        return list;
    }
}
