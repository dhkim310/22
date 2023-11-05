package erp.backend.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
