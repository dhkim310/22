package erp.backend.domain.salary.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
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
    @Column(name = "SALARY_ID")
    private long salaryId;

    @Column(name = "SALARY_EMP_ID")
    private long salaryEmpId;

    @Column(name = "SALARY_AMOUNT")
    private int salaryAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "SALARY_PAYDATE")
    private String salaryPayDate;

    @Column(name = "SALARY_PAYMONEY")
    private int salarPayMoney;

    @Column(name = "SALARY_BANK")
    private String salaryBank;

    @Column(name = "SALARY_ACCOUNTNUMBER")
    private String salaryAccountNumber;

    @Column(name = "SALARY_BONUS")
    private int salaryBonus;
}
