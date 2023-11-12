package erp.backend.domain.log.Vo;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class LogVo {
    private final LocalDateTime today =
            LocalDateTime.now()
                    .withHour(9)
                    .withMinute(0)
                    .withSecond(0);
    private final LocalDateTime notToday =
            LocalDateTime.now()
                    .withYear(1999)
                    .withMinute(0)
                    .withSecond(0);
    private final LocalDateTime test =
            LocalDateTime.now()
                    .withHour(0)
                    .withMinute(0)
                    .withSecond(0);

    public final String type1(LocalDateTime late) {
        return today.isBefore(late) ? "지각" : "출근";
    }

    public final String type2(LocalDateTime late) {
        return today.isBefore(late) ? "퇴근(지각)" : "퇴근";
    }

    public LocalDateTime type3(LocalDateTime notYet) {
        return (notYet == null || test.isAfter(notYet)) ? notToday : notYet;
    }
}