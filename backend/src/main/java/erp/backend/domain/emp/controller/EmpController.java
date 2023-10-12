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
@RequestMapping("/api/emp")
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

    @GetMapping("/fix-info")
    public ResponseEntity<EmpDetailResponse> fixInfo(){
        return ResponseEntity.ok(empService.empDetailResponse());
    }
    @PutMapping("/fix-info")
    public ResponseEntity<Long> fixInfoPasswordUpdate(@RequestBody EmpPasswordUpdateRequest request) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(empService.passwordUpdate(request));
    }
//    @GetMapping("/list")
//    public ResponseEntity<List<EmpListResponse>> list(){
//        return ResponseEntity.ok(empService.getEmpList());
//    }
    @GetMapping("list")
    public ResponseEntity<EmpListResult> empList(@PageableDefault(size = 3, sort = "empId", direction = Sort.Direction.ASC) Pageable pageable,
    Model model){
        EmpListResult listResult = empService.getEmpListResult(pageable);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }

    @GetMapping("/list/{empName}")
    public ResponseEntity<List<EmpListResponse>> searchList(@PathVariable String empName){
        return ResponseEntity.ok(empService.getEmpSearchList(empName));
    }
    @GetMapping("/main")
    public  ResponseEntity<EmpMainResponse> empMain() {
        return ResponseEntity.ok(empService.empMainResponse());
    }

}
