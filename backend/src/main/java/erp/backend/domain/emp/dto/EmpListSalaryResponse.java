package erp.backend.domain.emp.dto;

import erp.backend.domain.salary.entity.Salary;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpListSalaryResponse {
    private Long empId;
    private String empName;
    private List<Salary> salary;
}