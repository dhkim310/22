package erp.backend.domain.emp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmpPasswordUpdateRequest {
    @NotBlank(message = "공백은 허용하지 않습니다.")
    private String password;
}
