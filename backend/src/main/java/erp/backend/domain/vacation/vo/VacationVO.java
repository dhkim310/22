package erp.backend.domain.vacation.vo;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
public class VacationVO {
    private final int DAY = 24 * 60 * 60 * 1000;
    public int differenceInDays(LocalDate endDate, LocalDate startDate){
        return (int) ChronoUnit.DAYS.between(startDate, endDate);
    }
    // 둘 중에 하나 ( 연차 or 휴가 )
}
