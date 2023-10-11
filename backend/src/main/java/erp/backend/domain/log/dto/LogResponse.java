package erp.backend.domain.log.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogResponse {

    private LocalDateTime logCheckIn;
    private LocalDateTime logCheckOut;
}
