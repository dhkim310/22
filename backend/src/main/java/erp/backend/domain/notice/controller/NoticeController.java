package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import erp.backend.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping("/management")
    public void noticeInsert(@RequestPart(value = "requestDto") NoticeRequest request, @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        noticeService.noticeInsert(request, files);
    }

    @GetMapping("/management/detail/{id}")
    public ResponseEntity<NoticeDetailResponse> noticeDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }

    @DeleteMapping("/management/delete/{id}")
    public void noticeDelete(@PathVariable("id") Long id) {
        ResponseEntity.ok(noticeService.noticeDelete(id));
    }

    @PutMapping("/management/update/{id}")
    public ResponseEntity<Long> noticeUpdate(@PathVariable("id") Long id, @RequestBody NoticeRequest request) {
        return ResponseEntity.ok(noticeService.noticeUpdate(id, request));
    }
}
