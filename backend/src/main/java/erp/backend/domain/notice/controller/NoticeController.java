package erp.backend.domain.notice.controller;

import erp.backend.domain.notice.dto.*;
import erp.backend.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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
    public ResponseEntity<NoticeListResult> noticeList(@PageableDefault(size = 3, sort = "noticeId", direction = Sort.Direction.DESC) Pageable pageable,
                                                       Model model) {
        NoticeListResult listResult = noticeService.getBoardListResult(pageable);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<NoticeDetailResponse> noticeDetail(@PathVariable("id") Long id) {
        noticeService.updateView(id);
        return ResponseEntity.ok(noticeService.getNoticeDetail(id));
    }

    @PostMapping("/management")
    public ResponseEntity<Long> noticeInsert(@RequestPart(value = "requestDto") NoticeRequest request, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(noticeService.noticeInsert(request, files));
    }

    @DeleteMapping("/management/delete/{id}")
    public ResponseEntity<Void> noticeDelete(@PathVariable("id") Long id) {
        noticeService.noticeDelete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/management/update/{id}")
    public ResponseEntity<Long> noticeUpdate(@PathVariable("id") Long id, @RequestPart(value = "requestDto") NoticeUpdate request, @RequestPart(value = "files", required = false) List<MultipartFile> files) throws IOException {
        return ResponseEntity.ok(noticeService.noticeUpdate(id, request, files));
    }
}
