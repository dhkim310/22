package erp.backend.domain.log.Vo;

import java.time.LocalDateTime;

public class LogVo {
    public LocalDateTime today = LocalDateTime.now().withHour(9).withMinute(0).withSecond(0);

    public String type1(LocalDateTime late) {
        if(today.isBefore(late)){
            return "지각";
        }
        return "출근";
    }
    public String type2(LocalDateTime sooooooLate) {
        if(today.isBefore(sooooooLate)){
            return "퇴근(지각)";
        }
        return "퇴근";
    }
}
