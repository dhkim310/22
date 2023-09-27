package erp.backend.domain.approvalfile.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class ApprovalFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVALFILE_ID")
    private long approvalFileId;

    //외래키
    @Column(name = "APPROVALFILE_APPROVAL_ID")
    private long approvalFileApprovalId;

    @Column(name = "APPROVALFILE_NAME")
    private String approvalFileName;

    @Column(name = "APPROVALFILE_ORIGINNAME")
    private String approvalFileOriginname;

    @Column(name = "APPROVALFILE_PATH")
    private String approvalFilePath;
}
