package erp.backend.domain.salary.dto;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalaryResponse {
    private LocalDateTime salaryPayDate;
    private String salaryBank;
    private String salaryAccountNumber;
    private double salaryPayMoney;
    private double salaryTax;
    private double salaryBonus;

}