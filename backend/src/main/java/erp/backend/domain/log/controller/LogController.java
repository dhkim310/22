package erp.backend.domain.log.controller;

import erp.backend.domain.log.dto.LogInsert;
import erp.backend.domain.log.dto.LogResponse;
import erp.backend.domain.log.dto.LogUpdate;
import erp.backend.domain.log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/log")
public class LogController {

    private final LogService logService;

    @PostMapping("/commute")
    public ResponseEntity<Long> createLog(@RequestBody LogInsert request) {
        return ResponseEntity.ok(logService.logInsert(request));
    }
    @PutMapping("/commute")
    public ResponseEntity<Long> updateLog(@RequestBody LogUpdate request) {
        return ResponseEntity.ok(logService.logUpdate(request));
    }
    @GetMapping("/commute")
    public ResponseEntity<LogResponse> logResponse(){
        LogResponse logResponse = logService.logResponse();
        return ResponseEntity.ok(logResponse);
    }
}
