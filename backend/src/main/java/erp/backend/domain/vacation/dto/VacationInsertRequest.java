package erp.backend.domain.vacation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacationInsertRequest {
    private Long empId;
    private int vacationTotalVacation;
    private int vacationTotalDayOff;
    private int vacationUsedCount;
    private LocalDate vacationStartDate;
    private LocalDate vacationEndDate;
    private String vacationWhy;
}
