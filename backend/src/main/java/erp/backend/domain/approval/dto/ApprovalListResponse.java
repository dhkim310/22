package erp.backend.domain.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalListResponse {
    private long approvalId;
    private String approvalDrafter;
    private String approvalSubject;
    private String approvalCheck;
    private String approvalCheckMan;
    private String approvalCheckManPosition;
    private LocalDate approvalUpLoadDate;
    private LocalDate approvalBackDate;
    private LocalDate approvalSuccessDate;
}