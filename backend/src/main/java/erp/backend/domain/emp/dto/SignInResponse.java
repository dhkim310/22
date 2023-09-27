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
    private Long id;
    private String name;
    private String email;
    private List<String> roles;
}
