package erp.backend.domain.emp.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpTreeList {
    private Long empId;
    private String empName;
}