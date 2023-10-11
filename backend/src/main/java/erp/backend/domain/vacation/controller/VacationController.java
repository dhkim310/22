package erp.backend.domain.vacation.controller;

import erp.backend.domain.board.dto.BoardInsert;
import erp.backend.domain.notice.dto.NoticeListResponse;
import erp.backend.domain.vacation.dto.VacationInsert;
import erp.backend.domain.vacation.dto.VacationListResponse;
import erp.backend.domain.vacation.entity.Vacation;
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
}

