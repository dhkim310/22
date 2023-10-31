package erp.backend.domain.log.controller;

import erp.backend.domain.log.dto.LogListResponse;
import erp.backend.domain.log.dto.LogResponse;
import erp.backend.domain.log.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/log")
public class LogController {

    private final LogService logService;

    @GetMapping
    public ResponseEntity<LogResponse> logResponse() {
        LogResponse logResponse = logService.logResponse();
        return ResponseEntity.ok(logResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<LogListResponse>> logListResponse(@PathVariable("id") Long id) {
        return ResponseEntity.ok(logService.searchList(id));
    }

    @PostMapping
    public ResponseEntity<Long> logInsert() {
        return ResponseEntity.ok(logService.logInsert());
    }

    @PutMapping
    public ResponseEntity<Long> logUpdate() {
        return ResponseEntity.ok(logService.logUpdate());
    }

}
