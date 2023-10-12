package erp.backend.domain.salary.controller;

import erp.backend.domain.emp.dto.EmpListResponse;
import erp.backend.domain.emp.service.EmpService;
import erp.backend.domain.salary.dto.SalaryInsert;
import erp.backend.domain.salary.dto.SalaryResponse;
import erp.backend.domain.salary.service.SalaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/salary")
public class SalaryController {

    private final SalaryService salaryService;
    private final EmpService empService;


    @GetMapping("/detail/{empId}")
    public ResponseEntity<SalaryResponse> detailList(@PathVariable("empId") Long empId){
        return ResponseEntity.ok(salaryService.getEmpSalary(empId));
    }
    @PostMapping("/insert")
    public ResponseEntity<Long> salaryInsert(@RequestBody SalaryInsert request){
        return ResponseEntity.ok(salaryService.salaryInsert(request));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> salaryDelete(@PathVariable("id") Long id){
        salaryService.salaryDelete(id);
        return ResponseEntity.ok().build();
    }
}
