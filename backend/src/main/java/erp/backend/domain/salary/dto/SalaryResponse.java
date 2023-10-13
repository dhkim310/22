package erp.backend.domain.salary.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SalaryResponse {
    private LocalDate salaryPayDate;
    private String salaryBank;
    private String salaryAccountNumber;
    private Long salaryPayMoney;
    private Long salaryTax;
    private Long salaryBonus;
}