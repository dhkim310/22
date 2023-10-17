package erp.backend.domain.salary.controller;

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

    @PostMapping
    public ResponseEntity<Long> salaryInsert(@RequestBody SalaryInsert request) {
        return ResponseEntity.ok(salaryService.salaryInsert(request));
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<List<SalaryResponse>> detailList(@PathVariable("id") Long id) {
        return ResponseEntity.ok(salaryService.getSalaryDetail(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> salaryDelete(@PathVariable("id") Long id) {
        salaryService.salaryDelete(id);
        return ResponseEntity.ok().build();
    }
}
