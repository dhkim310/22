package erp.backend.domain.emp.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class EmpListResponse {
    private String empName;
    private Long empId;
    private String empPosition;
}
