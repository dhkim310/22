package erp.backend.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpMainResponse {
    private String empName;
    private String empDept;
    private String empEmail;
    private String empPhoneNumber;
    private String empPosition;
    private String empPicturePath;
}