package erp.backend.domain.log.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateLog {
    private LocalDateTime logCheckOut;
    private String logStatus;
}
