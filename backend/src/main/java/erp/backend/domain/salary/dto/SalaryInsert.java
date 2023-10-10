package erp.backend.domain.salary.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SalaryInsert {
    private int amount;
    private LocalDateTime paydate;
    private int paymoney;
    private String bank;
    private String accountnumber;
    private int bonus;
}
