package erp.backend.domain.emppicture.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class EmpPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMPPICTURE_ID")
    private long empPictureId;
    //외래키
    @Column(name = "EMPPICTURE_EMP_ID")
    private long empPictureEmpId;

    @Column(name = "EMPPICTURE_NAME")
    private String empPictureName;

    @Column(name = "EMPPICTURE_ORIGINNAME")
    private String empPictureOriginName;

    @Column(name = "EMPPICTURE_PATH")
    private String empPicturePath;
}
