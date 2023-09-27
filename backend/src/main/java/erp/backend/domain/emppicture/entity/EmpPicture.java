package erp.backend.domain.emppicture.entity;

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
public class EmpPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long emppicture_id;
    //외래키
    private long emppicture_emp_id;

    private String emppicture_name;

    private String emppicture_originname;

    private String emppicture_path;
}
