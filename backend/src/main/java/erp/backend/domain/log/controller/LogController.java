package erp.backend.domain.log.controller;

import erp.backend.domain.log.dto.CreateLog;
import erp.backend.domain.log.dto.UpdateLog;
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
    public ResponseEntity<Long> createLog(@RequestBody CreateLog request) {
        return ResponseEntity.ok(logService.createLog(request));
    }
    @PutMapping("/commute")
    public ResponseEntity<Long> updateLog(Long id,@RequestBody UpdateLog request) {
        return ResponseEntity.ok(logService.updateLog(id,request));
    }
}
