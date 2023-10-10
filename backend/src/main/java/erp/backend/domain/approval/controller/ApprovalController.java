package erp.backend.domain.approval.controller;

import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emp")
public class ApprovalController {

    private final ApprovalService approvalService;
    @PostMapping("/approval")
    public ResponseEntity<Long> createApproval(@RequestBody ApprovalInsert request) {
        return ResponseEntity.ok(approvalService.approvalInsert(request));
    }
}
