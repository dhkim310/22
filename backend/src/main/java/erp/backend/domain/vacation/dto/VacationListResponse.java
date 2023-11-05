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
public class VacationListResponse {

    private Long vacationId;
    private Long empId;
    private int vacationTotalVacation;
    private int vacationUsedVacation;
    private int vacationTotalDayOff;
    private int vacationUsedDayOff;
    private LocalDate vacationStartDate;
    private LocalDate vacationEndDate;
    private String vacationWhy;

}
