package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpListResponse {
    private long empId;
    private String empName;
    private String empPosition;
    private long empAmount;
    private Dept dept;
}
