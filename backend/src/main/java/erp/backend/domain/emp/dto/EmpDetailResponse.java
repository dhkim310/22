package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpDetailResponse {
    private String empName;
    private String dept;
    private String empPosition;
    private String empPhoneNumber;
    private LocalDate empBirthday;
    private LocalDate empStartDate;
    private String empAddress;
    private String empDetailAddress;
    private String empEmail;
    private String password;
}
