package erp.backend.domain.memo.controller;

import erp.backend.domain.memo.dto.MemoInsert;
import erp.backend.domain.memo.dto.MemoResponse;
import erp.backend.domain.memo.dto.MemoUpdate;
import erp.backend.domain.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memo")
public class MemoController {
    private final MemoService memoService;
    @GetMapping
    public ResponseEntity<MemoResponse> memoResponseResponseEntity() {
        MemoResponse memoResponse = memoService.memoResponse();
        return ResponseEntity.ok(memoResponse);
    }
    @PostMapping
    public ResponseEntity<Long> createMemo(@RequestBody MemoInsert request){
        return ResponseEntity.ok(memoService.memoInsert(request));
    }
    @PutMapping
    public ResponseEntity<Long> updateMemo(@RequestBody MemoUpdate request){
        return ResponseEntity.ok(memoService.memoUpdate(request));
    }
}
