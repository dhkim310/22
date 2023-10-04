package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.CreateNotice;
import erp.backend.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping("/management")
    public ResponseEntity<Long> createNotice(@RequestBody CreateNotice request) {
        return ResponseEntity.ok(noticeService.createNotice(request));
    }
}
