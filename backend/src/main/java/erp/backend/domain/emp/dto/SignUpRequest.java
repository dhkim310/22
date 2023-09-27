package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Setter
@Getter
public class SignUpRequest {
    // 사원 추가: 초기 비밀번호는 1234로 입력 후 사원 마이페이지 변경.

    @NotBlank(message = "사원의 이름을 입력해 주세요.")
    private String empName;

    @NotBlank(message = "사원의 이메일을 입력해 주세요.")
    @Email
    private String empEmail;

    @NotBlank(message = "사원의 부서를 지정해 주세요.")
    private Dept empDeptId;

    @NotBlank(message = "사원의 직급을 입력해 주세요")
    private String empPosition;

    @NotBlank(message = "사원의 권한을 입력해 주세요")
    private String roles;

    @NotNull(message = "사원의 생년월일을 입력해 주세요")
    private Date empBirthday;

    @NotBlank(message = "사원의 핸드폰 번호를 입력해 주세요.")
    private String empPhoneNumber;

    @NotBlank(message = "사원의 주소를 입력해 주세요.")
    private String empAddress;

    private String empDetailAddress;

    @NotBlank(message = "사원의 성별을 선택해 주세요")
    private String empGender;

    @NotBlank(message = "사원의 입사일 입니다.")
    private LocalDate empStartDate;

}