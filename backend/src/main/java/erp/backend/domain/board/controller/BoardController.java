package erp.backend.domain.board.controller;

import erp.backend.domain.board.dto.*;

import erp.backend.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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

    @GetMapping("/detail/{id}")
    public ResponseEntity<BoardDetailResponse> detailBoard(@PathVariable("id") Long id) {
        return ResponseEntity.ok(boardService.getBoardDetail(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Long> BoardUpdate(@PathVariable("id") Long id, @RequestBody BoardUpdate request) {
        return ResponseEntity.ok(boardService.boardUpdate(id, request));
    }

    @GetMapping("/list")
    public ResponseEntity<BoardListResult> BoardList(@PageableDefault(size=3, sort="boardId", direction= Sort.Direction.DESC) Pageable pageable,
                       Model model){
        BoardListResult listResult = boardService.getBoardListResult(pageable);
        model.addAttribute("listResult", listResult);
        System.out.println("$$$"+listResult);
        return ResponseEntity.ok(listResult);
    }
}
