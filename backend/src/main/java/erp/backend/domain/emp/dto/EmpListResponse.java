package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpListResponse {
    private Long empId;
    private String empName;
    private String empPosition;
    private Long empAmount;
    private Dept dept;
}
