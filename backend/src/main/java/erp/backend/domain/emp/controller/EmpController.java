package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.service.EmpService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/emp")
public class EmpController {
    private final EmpService empService;

    @PostMapping("/sign-in")
    public ResponseEntity<SignInResponse> signIn(@RequestBody @Valid SignInRequest request, HttpServletResponse httpResponse) {
        System.out.println(request.toString());
        return ResponseEntity.ok(empService.signIn(request, httpResponse));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Boolean> signUp(@RequestBody @Valid SignUpRequest request) {
        empService.signUp(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/fix-info")
    public ResponseEntity<EmpDetailResponse> fixInfo(){
        return ResponseEntity.ok(empService.empDetailResponse());
    }
    @PutMapping("/fix-info")
    public ResponseEntity<Long> fixInfoPasswordUpdate(@RequestBody EmpPasswordUpdateRequest request) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(empService.passwordUpdate(request));
    }

    @GetMapping("/list")
    public ResponseEntity<List<EmpListResponse>> list(){
        return ResponseEntity.ok(empService.empList());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<EmpListSalaryResponse> getEmployeeSalary(@PathVariable Long id) {
        EmpListSalaryResponse response = empService.empSalary(id);
        return ResponseEntity.ok(response);
    }
}
