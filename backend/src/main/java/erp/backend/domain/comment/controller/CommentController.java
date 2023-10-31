package erp.backend.domain.comment.controller;

import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/comment")
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{id}") //보드 상세보기랑 합쳐야 함.
    public ResponseEntity<CommentResponse> commentInsert(@PathVariable("id") Long boardId, @RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.commentInsert(boardId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> commentDelete(@PathVariable("id") Long commentId) {
        commentService.commentDelete(commentId);
        return ResponseEntity.ok().build();
    }

}
