package erp.backend.domain.vacation.vo;

import org.springframework.stereotype.Component;

@Component
public class VacationVO {
    private final int DAY =  (24 * 60 * 60 * 1000);
    public int differenceInDays(int endDate, int startDate) {
        return Math.round((endDate -  startDate) / DAY);
    }
}
