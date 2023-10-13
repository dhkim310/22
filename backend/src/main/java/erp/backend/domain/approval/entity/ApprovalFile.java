package erp.backend.domain.approval.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.uploadfile.entity.UploadFile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@NoArgsConstructor // 기본생성자
@Getter
@Table(name = "approvalfile")
public class ApprovalFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "APPROVALFILE_ID")
    private long approvalFileId;

    //외래키
    @ManyToOne
    @JoinColumn(name = "APPROVALFILE_APPROVAL_ID")
    @JsonIgnore
    private Approval approval;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "APPROVALFILE_UPLOADFILE_ID")
    @JsonIgnore
    private UploadFile uploadFile;

    public ApprovalFile(Approval approval, UploadFile uploadFile) {
        this.approval = approval;
        this.uploadFile = uploadFile;
    }
}
