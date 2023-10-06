package erp.backend.domain.companyschedule.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ScheduleInsert {
    private LocalDate start;
    private LocalDate end;
    private String title;

}
