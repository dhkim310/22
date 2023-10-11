package erp.backend.domain.vacation.controller;

import erp.backend.domain.vacation.dto.VacationInsert;
import erp.backend.domain.vacation.dto.VacationUpdate;
import erp.backend.domain.vacation.service.VacationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vacation")
public class VacationController {
    //select, create, insert(사원 가입될때 처음 insert?, 일정 날짜에 자동 insert? , 년도 넘어갈때 인사과 수작업?)
    private final VacationService vacationService;
    @PostMapping("/insert")
    public ResponseEntity<Long> vacationInsert(@RequestBody VacationInsert request){
        return ResponseEntity.ok(vacationService.vacationInsert(request));
    }

    @PutMapping("/update")
    public ResponseEntity<Long> vacationUpdate(@RequestBody VacationUpdate request) {
        return ResponseEntity.ok(vacationService.vacationUpdate(request));
    }
}

