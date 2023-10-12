package erp.backend.domain.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalDetailResponse {

    private long approvalId;
    private String approvalSubject;
    private String approvalContent;
}
