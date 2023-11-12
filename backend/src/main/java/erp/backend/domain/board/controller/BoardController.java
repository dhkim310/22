package erp.backend.domain.board.controller;

import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.board.dto.BoardListResult;
import erp.backend.domain.board.dto.BoardRequest;
import erp.backend.domain.board.dto.BoardUpdate;
import erp.backend.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    // 게시판
    @GetMapping
    public ResponseEntity<BoardListResult> boardSearchList(@RequestParam(value = "size") int size,
                                                           @RequestParam(value = "page") int page,
                                                           @RequestParam(value = "keyword", required = false) String subject) {

        BoardListResult listResult = boardService.boardSearchListResult(subject, PageRequest.of(page, size));
        return ResponseEntity.ok(listResult);
    }

    // 게시판 글 작성
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Long> boardInsert(@RequestPart(value = "requestDto") BoardRequest request,
                                            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(boardService.boardInsert(request, files));
    }

    // 게시글 상세보기
    @GetMapping("/{id}")
    public ResponseEntity<BoardDetailResponse> boardDetail(@PathVariable("id") Long id) {
        boardService.updateView(id);
        return ResponseEntity.ok(boardService.boardDetail(id));
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public void boardDelete(@PathVariable("id") Long id) {
        boardService.boardDelete(id);
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Long> boardUpdate(@PathVariable("id") Long id, @RequestPart(value = "requestDto") BoardUpdate request, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(boardService.boardUpdate(id, request, files));
    }
}