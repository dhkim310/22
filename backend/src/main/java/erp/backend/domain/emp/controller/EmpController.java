package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.service.EmpService;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
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

    @GetMapping("/emp/fix-info")
    public ResponseEntity<EmpDetailResponse> fixInfo() {
        return ResponseEntity.ok(empService.empDetailResponse());
    }

    @PutMapping("/emp/fix-info")
    public ResponseEntity<Long> fixInfoPasswordUpdate(@RequestBody EmpPasswordUpdateRequest request) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(empService.passwordUpdate(request));
    }

    @GetMapping("/emp")
    public ResponseEntity<EmpListResult> empList(@PageableDefault(size = 6, sort = "empId", direction = Sort.Direction.ASC) Pageable pageable,
                                                 Model model) {
        EmpListResult listResult = empService.getEmpListResult(pageable);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }
    @GetMapping("/emp/hrm-list")//인사관리 리스트
    public ResponseEntity<List<EmpHrmListResponse>> hrmList() {
        return ResponseEntity.ok(empService.searchAllList());
    }
    @GetMapping("/emp/hrm/{id}")//인사관리 한명보기
    public ResponseEntity<EmpReshuffleResponse> detailReshuffle(@PathVariable("id") Long id) {
        EmpReshuffleResponse response = empService.reshuffleResponse(id);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/emp/hrm/{id}")
    public ResponseEntity<Long> updateReshuffle(@PathVariable("id") Long id, @RequestBody EmpReshuffleRequest request) {
        return ResponseEntity.ok(empService.updateReshuffle(id, request));
    }

    @GetMapping("/{empName}")
    public ResponseEntity<EmpListResult> searchList(@PageableDefault(size = 6, sort = "empId", direction = Sort.Direction.ASC)
                                                    Pageable pageable, @PathVariable("empName") String empName, Model model) {
        EmpListResult listResult = empService.getEmpSearchList(pageable, empName);
        model.addAttribute("listResult", listResult);
        return ResponseEntity.ok(listResult);
    }

    @GetMapping("/main")
    public ResponseEntity<EmpMainResponse> empMain() {
        return ResponseEntity.ok(empService.empMainResponse());
    }

}
