package erp.backend.domain.approval.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVAL_ID")
    private long approvalId;

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
}
