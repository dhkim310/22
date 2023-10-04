package erp.backend.domain.emp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponse {

    private String token;
    private Long empId;
    private String empName;
    private String empEmail;
    private List<String> roles;
}
