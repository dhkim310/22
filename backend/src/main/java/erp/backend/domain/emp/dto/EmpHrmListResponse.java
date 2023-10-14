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
public class EmpHrmListResponse {
    private long empId;
    private String empName;
    private String empPosition;
    private String dept;
    private String empEmail;
    private String empStatus;
}
