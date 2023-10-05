package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.NoticeInsert;
import erp.backend.domain.notice.dto.NoticeDetailResponse;
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
    public ResponseEntity<Long> createNotice(@RequestBody NoticeInsert request) {
        return ResponseEntity.ok(noticeService.noticeInsert(request));
    }

    @GetMapping("/management/content/{id}")
    public ResponseEntity<NoticeDetailResponse> detailNotice(@PathVariable("id") Long id) {
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }
}
