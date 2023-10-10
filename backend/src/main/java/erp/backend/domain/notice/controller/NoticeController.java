package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.NoticeDetailResponse;
import erp.backend.domain.notice.dto.NoticeListResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import erp.backend.domain.notice.dto.UpdateNotice;
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

    @GetMapping("/list")
    public ResponseEntity<List<NoticeListResponse>> noticeList() {
        return ResponseEntity.ok(noticeService.noticeList());
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<NoticeDetailResponse> noticeDetail(@PathVariable("id") Long id) {
        noticeService.updateView(id);
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }

    @PostMapping("/management")
    public ResponseEntity<List<NoticeListResponse>> noticeInsert(@RequestPart(value = "requestDto") NoticeRequest request, @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        noticeService.noticeInsert(request, files);
        return ResponseEntity.ok(noticeService.noticeList());
    }

    @DeleteMapping("/management/delete/{id}")
    public ResponseEntity<Void> noticeDelete(@PathVariable("id") Long id) {
        noticeService.noticeDelete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/management/update/{id}")
    public ResponseEntity<Long> noticeUpdate(@PathVariable("id") Long id, @RequestPart(value = "requestDto") UpdateNotice request, @RequestPart(value = "files") List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(noticeService.noticeUpdate(id, request, files));
    }
}
