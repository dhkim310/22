package erp.backend.domain.vacation.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacationUpdate {
    private int totalVacation;
    private int usedVacation;
    private int totalDayOff;
    private int usedDayOff;
    private LocalDate startDate;
    private LocalDate endDate;
    private String why;
}

