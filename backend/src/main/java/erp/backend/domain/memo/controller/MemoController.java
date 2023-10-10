package erp.backend.domain.memo.controller;

import erp.backend.domain.memo.dto.MemoInsert;
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
    @PostMapping("/write")
    public ResponseEntity<Long> createMemo(@RequestBody MemoInsert request){
        return ResponseEntity.ok(memoService.memoInsert(request));
    }
    @PutMapping("/update/{memoId}")
    public ResponseEntity<Long> updateMemo(@PathVariable Long memoId, @RequestBody MemoUpdate request){
        return ResponseEntity.ok(memoService.memoUpdate(memoId, request));
    }

    @DeleteMapping("/delete/{memoId}")
    public void deleteMemo(@PathVariable Long memoId){
        memoService.memoDelete(memoId);
    }
}
