package erp.backend.domain.memo.controller;

import erp.backend.domain.memo.dto.MemoInsert;
import erp.backend.domain.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/memo")
public class MemoController {
    private final MemoService memoService;
    @PostMapping("/write")
    public ResponseEntity<Long> createMemo(@RequestBody MemoInsert request){
        return ResponseEntity.ok(memoService.createMemo(request));
    }
}
