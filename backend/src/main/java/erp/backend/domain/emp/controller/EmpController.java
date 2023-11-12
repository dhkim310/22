package erp.backend.domain.emp.controller;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.entity.EmpPicture;
import erp.backend.domain.emp.service.EmpService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

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

    @PutMapping("/emp/fix-address")
    public ResponseEntity<Long> fixAddress(@RequestBody EmpAddressRequest request) {
        return ResponseEntity.ok(empService.addressUpdate(request));
    }

    @PutMapping("/emp/fix-detail-address")
    public ResponseEntity<Long> fixDetailAddress(@RequestBody EmpAddressRequest request) {
        return ResponseEntity.ok(empService.detailAddressUpdate(request));
    }

    @PutMapping("/emp/picture-update")
    public ResponseEntity<EmpPicture> pictureUpdate(@RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(empService.pictureUpdate(file));
    }

    @GetMapping("/emp/salary-list")
    public ResponseEntity<List<EmpSalaryListResponse>> empSalaryList() {
        return ResponseEntity.ok(empService.getEmpList());
    }

    @GetMapping("/emp/hrm-list")//인사관리 리스트
    public ResponseEntity<List<EmpHrmListResponse>> hrmList() {
        return ResponseEntity.ok(empService.searchAllList());
    }

    @GetMapping("/emp-list")//인사관리 리스트
    public ResponseEntity<List<EmpHrmListResponse>> empList() {
        return ResponseEntity.ok(empService.searchAllList());
    }

    @GetMapping("/emp/hrm/{id}")//인사관리 한명보기
    public ResponseEntity<EmpReshuffleResponse> detailReshuffle(@PathVariable("id") Long id) {
        EmpReshuffleResponse response = empService.reshuffleResponse(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/emp/hrm/{id}")
    public ResponseEntity<Long> updateReshuffle(@PathVariable("id") Long id,
                                                @RequestBody EmpReshuffleRequest request) {
        return ResponseEntity.ok(empService.updateReshuffle(id, request));
    }

    @GetMapping("/main")
    public ResponseEntity<EmpMainResponse> empMain() {
        return ResponseEntity.ok(empService.empMainResponse());
    }

    @GetMapping("/emp/tree")
    public ResponseEntity<DeptEmpList> empTreeList(@RequestParam(value = "deptName", required = false) String deptName) {
        return ResponseEntity.ok(empService.empTreeList(deptName));
    }
}