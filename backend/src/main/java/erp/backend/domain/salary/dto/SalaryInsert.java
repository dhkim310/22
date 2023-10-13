package erp.backend.domain.salary.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalaryInsert {
    private String bank;
    private String accountNumber;
    private int bonus;
}
