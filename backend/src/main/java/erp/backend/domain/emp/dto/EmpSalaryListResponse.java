package erp.backend.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpSalaryListResponse {
    private long empId;
    private String empName;
    private String empPosition;
    private long empAmount;
    private String deptName;
}
