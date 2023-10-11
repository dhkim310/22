package erp.backend.domain.vacation.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class VacationUpdate {
    private Long vacationId;
    //총 휴가
    private int vacationTotalVacation;
    //사용 휴가
    private int vacationUsedVacation;
    //총 연차
    private int vacationTotalDayOff;
    //사용 연차
    private int vacationUsedDayOff;
    //연차사용일
    private LocalDate vacationDayOffDate;
}
