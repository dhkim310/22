package erp.backend.domain.salary.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SALARY_ID")
    private Long salaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SALARY_EMP_ID")
    private Emp emp;

    @Column(name = "SALARY_PAYDATE")
    private LocalDate salaryPayDate;

    @Column(name = "SALARY_BANK")
    private String salaryBank;

    @Column(name = "SALARY_ACCOUNTNUMBER")
    private String salaryAccountNumber;

    @Column(name = "SALARY_PAYMONEY")
    private Long salaryPayMoney;

    @Column(name = "SALARY_TAX")
    private Long salaryTax;

    @Column(name = "SALARY_BONUS")
    private Long salaryBonus;

}
