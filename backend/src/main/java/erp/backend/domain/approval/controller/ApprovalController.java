package erp.backend.domain.approval.controller;

import erp.backend.domain.approval.dto.ApprovalDetailResponse;
import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.dto.ApprovalListResponse;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/approval")
public class ApprovalController {

    private final ApprovalService approvalService;


    @GetMapping
    public ResponseEntity<List<ApprovalListResponse>> searchList() {
        return ResponseEntity.ok(approvalService.searchList());
    }
    @PostMapping
    public ResponseEntity<Long> approvalInsert(@RequestPart(value = "requestDto") ApprovalInsert request, @RequestPart(value = "files")List<MultipartFile> files) {
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