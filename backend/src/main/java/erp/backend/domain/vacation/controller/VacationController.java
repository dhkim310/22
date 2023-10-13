package erp.backend.domain.vacation.controller;

import erp.backend.domain.vacation.dto.VacationInsert;
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

    @GetMapping("/list")
    public ResponseEntity<List<VacationListResponse>> vacationList() {
        return ResponseEntity.ok(vacationService.vacationList());
    }

    @PostMapping("/insert")
    public ResponseEntity<Long> vacationInsert(@RequestBody VacationInsert request) {
        return ResponseEntity.ok(vacationService.vacationInsert(request));
    }

    @PutMapping("/update/{vacationId}")
    public ResponseEntity<Long> vacationUpdate(@PathVariable("vacationId") Long vacationId, @RequestBody VacationUpdate request) {
        return ResponseEntity.ok(vacationService.vacationUpdate(vacationId, request));
    }
}

