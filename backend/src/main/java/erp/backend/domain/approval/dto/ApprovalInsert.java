package erp.backend.domain.approval.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class ApprovalInsert {

    private String approvalSubject;
    private String approvalContent;
    private String approvalCheckMan;
    private String approvalCheckManPosition;
}