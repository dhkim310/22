package erp.backend.domain.salary.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long salary_id;

    private long salary_emp_id;

    private int salary_amount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    private String salary_paydate;

    private int salary_paymoney;

    private String salary_bank;

    private String salary_accountnumber;

    private int salary_bonus;
}
