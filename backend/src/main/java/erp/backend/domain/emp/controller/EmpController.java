package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.service.EmpService;
import erp.backend.domain.salary.dto.SalaryResponse;
import erp.backend.domain.salary.service.SalaryService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmpController {
    private final EmpService empService;
    private final SalaryService salaryService;

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

    @GetMapping("/emp/fix-info")
    public ResponseEntity<EmpDetailResponse> fixInfo() {
        return ResponseEntity.ok(empService.empDetailResponse());
    }

    @PutMapping("/emp/fix-info")
    public ResponseEntity<Long> fixInfoPasswordUpdate(@RequestBody EmpPasswordUpdateRequest request) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(empService.passwordUpdate(request));
    }

    @GetMapping("/emp/list")
    public ResponseEntity<EmpListResult> empList(@PageableDefault(size = 6, sort = "empId", direction = Sort.Direction.ASC) Pageable pageable,
                                                 Model model) {
        EmpListResult listResult = empService.getEmpListResult(pageable);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }

    @GetMapping("/emp/list/{empName}")
    public ResponseEntity<EmpListResult> searchList(@PageableDefault(size = 6, sort = "empId", direction = Sort.Direction.ASC)
                                                                Pageable pageable, @PathVariable("empName") String empName, Model model){
        EmpListResult listResult = empService.getEmpSearchList(pageable, empName);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }
    @GetMapping("/main")
    public ResponseEntity<EmpMainResponse> empMain() {
        return ResponseEntity.ok(empService.empMainResponse());
    }

}
