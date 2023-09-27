package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.SignInRequest;
import erp.backend.domain.emp.dto.SignInResponse;
import erp.backend.domain.emp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emp")
public class EmpController {
    private final UserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(@RequestBody @Valid SignInRequest request) {
        System.out.println(request.toString());
        return ResponseEntity.ok(userService.signIn(request));
    }
}
