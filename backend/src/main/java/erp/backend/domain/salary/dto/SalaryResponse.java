package erp.backend.domain.salary.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.salary.entity.Salary;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalaryResponse {
    private LocalDateTime salaryPayDate;
    private String salaryBank;
    private String salaryAccountNumber;
    private double salaryPayMoney;
    private double salaryTax;
    private double salaryBonus;
}