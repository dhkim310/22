package erp.backend.domain.companyschedule.controller;

import erp.backend.domain.companyschedule.dto.ScheduleInsert;
import erp.backend.domain.companyschedule.dto.ScheduleListResponse;
import erp.backend.domain.companyschedule.service.CompanyScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CompanyScheduleController {
    private final CompanyScheduleService companyScheduleService;

    @PostMapping("/schedule")
    public ResponseEntity<Long> insertEventApi(@RequestBody ScheduleInsert request) {
        return ResponseEntity.ok(companyScheduleService.scheduleInsert(request));
    }
    @GetMapping("/schedule")
    public ResponseEntity<List<ScheduleListResponse>> searchList() {
        return ResponseEntity.ok(companyScheduleService.searchList());
    }
}
