package erp.backend.domain.approval.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@JsonIgnoreProperties(value = {"approvalFileList"})
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVAL_ID")
    private long approvalId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APPROVAL_EMP_ID")
    private Emp emp;

    @Column(name = "APPROVAL_SUBJECT")
    private String approvalSubject;

    @Column(name = "APPROVAL_CONTENT")
    private String approvalContent;

    @Column(name = "APPROVAL_CHECK")
    private String approvalCheck;

    @Column(name = "APPROVAL_CHECKMAN")
    private String approvalCheckMan;

    @Column(name = "APPROVAL_CHECKMANPOSITION")
    private String approvalCheckManPosition;

    @Column(name = "APPROVAL_UPLOADDATE")
    private LocalDate approvalUpLoadDate;

    @Column(name = "APPROVAL_BACKDATE")
    private LocalDate approvalBackDate;

    @Column(name = "APPROVAL_SUCCESSDATE")
    private LocalDate approvalSuccessDate;

    @OneToMany(mappedBy = "approval", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @JsonIgnore
    private List<ApprovalFile> approvalFileList = new ArrayList<>();

    public void update(ApprovalUpdate request) {
        this.approvalCheck = request.getApprovalCheck();
        if (approvalCheck.equals("결재완료")) {
            this.approvalSuccessDate = LocalDate.now();
        } else if (approvalCheck.equals("결재반려")) {
            this.approvalBackDate = LocalDate.now();
        }
    }

}
