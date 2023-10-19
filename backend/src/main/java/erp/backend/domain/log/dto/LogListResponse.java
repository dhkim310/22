package erp.backend.domain.log.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogListResponse {
    private long logId;
    private LocalDate logDate;
    private LocalDateTime logCheckIn;
    private LocalDateTime logCheckOut;
    private String logStatus;
}
