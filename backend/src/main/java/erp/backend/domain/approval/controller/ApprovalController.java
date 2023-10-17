package erp.backend.domain.approval.controller;

import erp.backend.domain.approval.dto.ApprovalDetailResponse;
import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.dto.ApprovalListResult;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/approval")
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping("wait")
    public ResponseEntity<ApprovalListResult> approvalWaitPage(@PageableDefault(size = 10, sort = "approvalId", direction = Sort.Direction.DESC) Pageable pageable) {
        ApprovalListResult listResult = approvalService.approvalListResult(pageable);
        return ResponseEntity.ok(listResult);
    }

    @PostMapping
    public ResponseEntity<Long> approvalInsert(@RequestPart(value = "requestDto") ApprovalInsert request, @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        return ResponseEntity.ok(approvalService.approvalInsert(request, files));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApprovalDetailResponse> approvalDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(approvalService.approvalDetail(id));

    }

    @PutMapping("/success/{id}")
    public ResponseEntity<Long> successApproval(@PathVariable("id") Long id, @RequestBody ApprovalUpdate request) {
        return ResponseEntity.ok(approvalService.update(id, request));
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<Long> rejectApproval(@PathVariable("id") Long id, @RequestBody ApprovalUpdate request) {
        return ResponseEntity.ok(approvalService.reject(id, request));
    }
}