package erp.backend.domain.vacation.controller;

import erp.backend.domain.vacation.dto.VacationInitiate;
import erp.backend.domain.vacation.dto.VacationInsertRequest;
import erp.backend.domain.vacation.dto.VacationListResponse;
import erp.backend.domain.vacation.dto.VacationUpdate;
import erp.backend.domain.vacation.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vacation")
public class VacationController {
    private final VacationService vacationService;

    @GetMapping
    public ResponseEntity<List<VacationListResponse>> vacationList() {
        return ResponseEntity.ok(vacationService.vacationList());
    }

    @PostMapping
    public ResponseEntity<Long> vacationInsert(@RequestBody VacationInsertRequest request) {
        return ResponseEntity.ok(vacationService.vacationInsert(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> vacationUpdate(@PathVariable("id") Long empId, @RequestBody VacationUpdate request) {
        return ResponseEntity.ok(vacationService.vacationUpdate(empId, request));
    }
}

