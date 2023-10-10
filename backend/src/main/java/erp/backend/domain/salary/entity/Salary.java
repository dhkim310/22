package erp.backend.domain.salary.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SALARY_ID")
    private long salaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SALARY_EMP_ID")
    private Emp emp;

    @Column(name = "SALARY_AMOUNT")
    private int salaryAmount;

    @Column(name = "SALARY_PAYDATE")
    private LocalDateTime salaryPayDate;

    @Column(name = "SALARY_BANK")
    private String salaryBank;

    @Column(name = "SALARY_ACCOUNTNUMBER")
    private String salaryAccountNumber;

    @Column(name = "SALARY_PAYMONEY")
    private double salaryPayMoney;

    @Column(name = "SALARY_TAX")
    private double salaryTax;

    @Column(name = "SALARY_BONUS")
    private double salaryBonus;
}
