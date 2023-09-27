package erp.backend.domain.memo.entity;

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
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memo_id;
    //외래키
    private long memo_emp_id;

    private String memo_content;
}
