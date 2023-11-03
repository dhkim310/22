package erp.backend.domain.vacation.vo;

import org.springframework.stereotype.Component;

@Component
public class VacationVO {
    private final int DAY = 24 * 60 * 60 * 1000;
    public int differenceInDays(int endDate, int startDate){
        return Math.round((endDate - startDate) / DAY);
    }
    // 휴가 더 많이 들어갈 때
    // 둘 중에 하나 ( 연차 or 휴가 )
    // 컴포넌트 창에 사용일로 바꾸기
    // 시작일이 더 앞에 있으면 안되고
    // 헤더바꾸기
}
