package erp.backend.domain.approval.controller;

import erp.backend.domain.approval.dto.ApprovalDetailResponse;
import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.dto.ApprovalListResponse;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emp")
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping("/approval")
    public ResponseEntity<List<ApprovalListResponse>> searchList() {
        return ResponseEntity.ok(approvalService.searchList());
    }
    @GetMapping("/approval/{id}")
    public ResponseEntity<ApprovalDetailResponse> approvalDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(approvalService.approvalDetail(id));
    }
    @PostMapping("/approval")
    public ResponseEntity<Long> createApproval(@RequestBody ApprovalInsert request) {
        return ResponseEntity.ok(approvalService.approvalInsert(request));
    }
    @PutMapping("/approval-success/{id}")
    public ResponseEntity<Long> successApproval(@PathVariable("id") Long id, @RequestBody ApprovalUpdate request) {
        return ResponseEntity.ok(approvalService.update(id, request));
    }
    @PutMapping("/approval-reject/{id}")
    public ResponseEntity<Long> rejectApproval(@PathVariable("id") Long id, @RequestBody ApprovalUpdate request) {
        return ResponseEntity.ok(approvalService.reject(id, request));
    }
}
