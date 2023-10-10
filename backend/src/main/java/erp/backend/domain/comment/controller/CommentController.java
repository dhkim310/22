package erp.backend.domain.comment.controller;

import erp.backend.domain.comment.dto.CommentRequest;
import erp.backend.domain.comment.service.CommentService;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/comment")
@RestController
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/board/{boardId}/commentInsert") //보드 상세보기랑 합쳐야 함.
    public ResponseEntity commentInsert(@PathVariable Long boardId, @RequestBody CommentRequest dto){
        Emp emp = SecurityHelper.getAccount();
        return ResponseEntity.ok(commentService.commentInsert(emp.getEmpName(), boardId, dto));
    }

    @DeleteMapping("/board/{boardId}/commentDelete/{commentId}") //보드 상세보기랑 합쳐야 함.
    public ResponseEntity<Long> commentDelete(@PathVariable Long boardId, @PathVariable Long commentId) {
        commentService.commentDelete(boardId, commentId);
        return ResponseEntity.ok(commentId);
    }
}
