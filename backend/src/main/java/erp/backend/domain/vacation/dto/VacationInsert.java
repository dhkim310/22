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
public class VacationInsert {
    private Long empId;
    private String name;
    private int totalVacation;
    private int usedVacation;
    private int totalDayOff;
    private int usedDayOff;
    private LocalDate startDate;
    private LocalDate endDate;
    private String why;
}
