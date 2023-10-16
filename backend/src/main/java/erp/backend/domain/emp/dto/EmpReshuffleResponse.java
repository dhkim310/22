package erp.backend.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpReshuffleResponse {

    private Long empId;
    private String deptName;
    private String empName;
    private String empEmail;
    private String empPosition;
    private LocalDate empStartDate;
    private LocalDate empEndDate;
    private String empStatus;
}
