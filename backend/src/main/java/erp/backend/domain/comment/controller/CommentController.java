package erp.backend.domain.comment.controller;

import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.dto.CommentResponse;

import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.comment.service.CommentService;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/comment")
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{boardId}") //보드 상세보기랑 합쳐야 함.
    public ResponseEntity<Long> commentInsert(@PathVariable("boardId") Long boardId, @RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.commentInsert(boardId, request));
    }

    @DeleteMapping("/{boardId}/{commentId}")
    public ResponseEntity<Void> commentDelete(@PathVariable("boardId") Long boardId, @PathVariable("commentId") Long commentId) {
        commentService.commentDelete(boardId, commentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<List<CommentResponse>> commentList(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(commentService.commentList(boardId));
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<Comment>> commentSelect(@PathVariable Long boardId){
        return ResponseEntity.ok(commentService.commentSelect(boardId));
    }
}
