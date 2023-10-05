package erp.backend.domain.board.controller;

import erp.backend.domain.board.dto.BoardDelete;
import erp.backend.domain.board.dto.BoardInsert;

import erp.backend.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/insert")
    public ResponseEntity<Long> boardInsert(@RequestBody BoardInsert request) {
        return ResponseEntity.ok(boardService.boardInsert(request));
    }

    @DeleteMapping("/delete")
    public void boardDelete(@RequestBody BoardDelete request) {
        boardService.boardDelete(request);
    }
}
