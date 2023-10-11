package erp.backend.domain.log.Vo;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
public class LogVo {
    private final LocalDateTime today = LocalDateTime.now().withHour(9).withMinute(0).withSecond(0);
    private final LocalDateTime notToday = LocalDateTime.now().withYear(1999).withMinute(0).withSecond(0);
    public final String type1(LocalDateTime late) {
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
    public LocalDateTime type3(LocalDateTime notYet) {
        if(notYet==null || today.isAfter(notYet)){
            return notToday;
        }
        return notYet;
    }
}
