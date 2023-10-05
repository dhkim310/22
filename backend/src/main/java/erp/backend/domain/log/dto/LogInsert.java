package erp.backend.domain.log.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class LogInsert {
    private Date logDate;
    private LocalDateTime logCheckIn;
    private LocalDateTime logCheckOut;
    private String logStatus;
}
