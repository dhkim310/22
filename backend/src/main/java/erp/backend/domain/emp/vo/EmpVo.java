package erp.backend.domain.emp.vo;

import org.springframework.stereotype.Component;

@Component
public class EmpVo {
    private final String USER = "ROLE_USER";
    private final String ADMIN = "ROLE_ADMIN";
    private final long BASE_AMOUNT = 30000000;
    private final double ASSISTANT_MULTIPLIER = 1.0;
    private final double SENIOR_ASSISTANT_MULTIPLIER = 1.1;
    private final double MANAGER_MULTIPLIER = 1.45;
    private final double SENIOR_MANAGER_MULTIPLIER = 2.25;
    private final double PRESIDENT_MULTIPLIER = 3.5;

    private final long ASSISTANT_AMOUNT = (long) (BASE_AMOUNT * ASSISTANT_MULTIPLIER);
    private final long SENIOR_ASSISTANT_AMOUNT = (long) (BASE_AMOUNT * SENIOR_ASSISTANT_MULTIPLIER);
    private final long MANAGER_AMOUNT = (long) (BASE_AMOUNT * MANAGER_MULTIPLIER);
    private final long SENIOR_MANAGER_AMOUNT = (long) (BASE_AMOUNT * SENIOR_MANAGER_MULTIPLIER);
    private final long PRESIDENT_AMOUNT = (long) (BASE_AMOUNT * PRESIDENT_MULTIPLIER);
    public String type1(String position) {
        return position.equals("부장") ? ADMIN : USER;
    }
    public Long type2(String position) {

        return switch (position) {
            case "사원" -> ASSISTANT_AMOUNT;
            case "대리" -> SENIOR_ASSISTANT_AMOUNT;
            case "과장" -> MANAGER_AMOUNT;
            case "부장" -> SENIOR_MANAGER_AMOUNT;
            case "사장" -> PRESIDENT_AMOUNT;
            default -> {
                throw new IllegalArgumentException("잘못된 직급 : " + position);
            }
        };
    }
}
