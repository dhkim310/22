package erp.backend.domain.vacation.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class VacationInsert {
    private Long empId;
    private int vacationTotalVacation;
    private int vacationUsedVacation;
    private int vacationTotalDayOff;
    private int vacationUsedDayOff;
    private LocalDate vacationDateDayOff;

}
