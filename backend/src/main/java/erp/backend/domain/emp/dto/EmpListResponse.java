package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
