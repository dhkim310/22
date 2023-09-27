package erp.backend.domain.approvalfile.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private long approvalfile_id;
    //외래키
    private long approvalfile_approval_id;

    private String approvalfile_name;

    private String approvalfile_originname;

    private String approvalfile_path;
}
