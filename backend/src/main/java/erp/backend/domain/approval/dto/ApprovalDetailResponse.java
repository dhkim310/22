package erp.backend.domain.approval.dto;

import erp.backend.domain.approval.entity.ApprovalFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalDetailResponse {
    private long approvalId;
    private String approvalDrafter;
    private String approvalSubject;
    private String approvalContent;
    private String approvalCheckMan;
    private LocalDate approvalUpLoadDate;
    private List<ApprovalFile> approvalFileList;
}