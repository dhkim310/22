package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.*;
import erp.backend.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping
    public ResponseEntity<NoticeListResult> noticeList(@RequestParam(value = "size") int size,
                                                       @RequestParam(value = "page") int page) {
        NoticeListResult listResult = noticeService.noticeListResult(PageRequest.of(page, size));
        return ResponseEntity.ok(listResult);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Long> noticeInsert(@RequestPart(value = "requestDto")
                                             NoticeRequest request,
                                             @RequestPart(value = "files", required = false)
                                             List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(noticeService.noticeInsert(request, files));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoticeDetailResponse> noticeDetail(@PathVariable("id") Long id) {
        noticeService.updateView(id);
        return ResponseEntity.ok(noticeService.noticeDetail(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> noticeDelete(@PathVariable("id") Long id) {
        noticeService.noticeDelete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> noticeUpdate(@PathVariable("id") Long id,
                                             @RequestPart(value = "requestDto")
                                             NoticeUpdate request,
                                             @RequestPart(value = "files", required = false)
                                             List<MultipartFile> files) {
        return ResponseEntity.ok(noticeService.noticeUpdate(id, request, files));
    }

    @GetMapping("/first-list")
    public ResponseEntity<List<NoticeMainListResponse>> noticeMainList() {
        return ResponseEntity.ok(noticeService.noticeMainListResponses());
    }
}