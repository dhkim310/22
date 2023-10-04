package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.SignInRequest;
import erp.backend.domain.emp.dto.SignInResponse;
import erp.backend.domain.emp.dto.SignUpRequest;
import erp.backend.domain.emp.service.EmpService;
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
    private final EmpService empService;

    // 로그인
    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(@RequestBody @Valid SignInRequest request) {
        return ResponseEntity.ok(empService.signIn(request));
    }

    // 회원가입
    @PostMapping("/sign-up")
    public ResponseEntity<Boolean> signUp(@RequestBody @Valid SignUpRequest request) {
        empService.signUp(request);
        return ResponseEntity.ok().build();
    }
}
