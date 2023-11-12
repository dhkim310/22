package erp.backend.domain.vacation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacationDetail {
    private int vacationTotalVacation;
    private int vacationTotalDayOff;
    private int vacationUsedCount;

}