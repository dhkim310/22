package erp.backend.domain.board.controller;

import erp.backend.domain.board.dto.BoardDelete;
import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.board.dto.BoardInsert;

import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.service.BoardService;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/detail/{id}")
    public ResponseEntity<BoardDetailResponse> detailBoard(@PathVariable("id") Long id) {
        return ResponseEntity.ok(boardService.getBoardDetail(id));
    }
}
