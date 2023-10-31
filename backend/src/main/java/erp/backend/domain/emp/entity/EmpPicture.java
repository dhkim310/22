package erp.backend.domain.emp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.notice.entity.Notice;
import erp.backend.domain.uploadfile.entity.UploadFile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor // 기본생성자
@Table(name = "emppicture")
public class EmpPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMPPICTURE_ID")
    private Long empPictureId;

    //외래키
    @OneToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "EMPPICTURE_EMP_ID")
    @JsonIgnore
    private Emp emp;

    @OneToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "EMPPICTURE_UPLOADFILE_ID")
    private UploadFile uploadFile;

    public EmpPicture(Emp emp, UploadFile uploadFile) {
        this.emp = emp;
        this.uploadFile = uploadFile;
    }
}
