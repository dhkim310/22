package erp.backend.domain.approval.controller;

import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emp")
public class ApprovalController {

    private final ApprovalService approvalService;
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
