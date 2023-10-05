package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeInsert;
import erp.backend.domain.notice.dto.NoticeUpdate;
import erp.backend.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping("/management")
    public ResponseEntity<Long> noticeInsert(@RequestBody NoticeInsert request) {
        return ResponseEntity.ok(noticeService.noticeInsert(request));
    }

    @GetMapping("/management/detail/{id}")
    public ResponseEntity<NoticeDetailResponse> noticeDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }

    @DeleteMapping("/management/delete/{id}")
    public ResponseEntity<Boolean> noticeDelete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(noticeService.noticeDelete(id));
    }

    @PutMapping("/management/update/{id}")
    public ResponseEntity<Long> noticeUpdate(@PathVariable("id") Long id, @RequestBody NoticeUpdate request) {
        return ResponseEntity.ok(noticeService.noticeUpdate(id, request));
    }
}
