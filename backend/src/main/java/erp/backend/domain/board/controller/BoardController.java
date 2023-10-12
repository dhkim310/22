package erp.backend.domain.board.controller;

import erp.backend.domain.board.dto.*;
import erp.backend.domain.board.service.BoardService;
import erp.backend.domain.board.dto.BoardUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<BoardListResult> boardList(@PageableDefault(size = 3, sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable,
                                                     Model model) {
        BoardListResult listResult = boardService.boardListResult(pageable);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }

    @PostMapping
    public ResponseEntity<Long> boardInsert(@RequestPart(value = "requestDto") BoardRequest request, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(boardService.boardInsert(request, files));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDetailResponse> boardDetail(@PathVariable("id") Long id) {
        boardService.updateView(id);
        return ResponseEntity.ok(boardService.boardDetail(id));
    }

    @DeleteMapping("/{id}")
    public void boardDelete(@PathVariable("id") Long id) {
        boardService.boardDelete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> boardUpdate(@PathVariable("id") Long id, @RequestPart(value = "requestDto") BoardUpdate request, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(boardService.boardUpdate(id, request, files));
    }

}
