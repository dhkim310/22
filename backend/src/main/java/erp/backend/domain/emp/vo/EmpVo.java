package erp.backend.domain.emp.vo;

import org.springframework.stereotype.Component;

import java.util.Map;


@Component
public class EmpVo {
    private static final String USER = "ROLE_USER";
    private static final String ADMIN = "ROLE_ADMIN";
    private static final long BASE_AMOUNT = 30000000;

    private static final Map<String, Double> SALARY_MULTIPLIERS = Map.of(
            "사원", 1.0,
            "대리", 1.1,
            "과장", 1.45,
            "부장", 2.25,
            "사장", 3.5
    );

    public String type1(String position) {
        return position.equals("부장") ? ADMIN : USER;
    }

    public Long type2(String position) {
        Double multiplier = SALARY_MULTIPLIERS.get(position);
        if (multiplier == null) {
            throw new IllegalArgumentException("잘못된 직급 : " + position);
        }
        return Math.round(BASE_AMOUNT * multiplier);
    }
}
