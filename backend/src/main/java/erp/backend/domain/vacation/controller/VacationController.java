package erp.backend.domain.vacation.controller;

import erp.backend.domain.vacation.dto.*;
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

    @GetMapping("/{id}")
    public ResponseEntity<VacationDetail> vacationDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(vacationService.vacationDetail(id));
    }

    @PostMapping
    public ResponseEntity<Long> vacationInsert(@RequestBody VacationInsertRequest request) {
        return ResponseEntity.ok(vacationService.vacationInsert(request));
    }

}

