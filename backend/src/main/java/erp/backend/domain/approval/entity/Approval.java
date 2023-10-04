package erp.backend.domain.approval.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVAL_ID")
    private long approvalId;

    @JoinColumn(name = "APPROVAL_EMP_ID")
    private long approvalEmpId;

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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "APPROVAL_UPLOADDATE")
    private Date approvalUpLoadDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "APPROVAL_BACKDATE")
    private Date approvalBackDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "APPROVAL_SUCCESSDATE")
    private Date approvalSuccessDate;
}
