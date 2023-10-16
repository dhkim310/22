package erp.backend.domain.approval.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApprovalInsert {
    private String approvalSubject;
    private String approvalContent;
    private String approvalCheckMan;
    private String approvalCheckManPosition;
}