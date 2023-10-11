package erp.backend.domain.salary.Vo;

import java.time.LocalDateTime;

public class SalaryVO {
    private double basic_salary = 2200000;
    private final double ASSISTANT = basic_salary;
    private final double SENIOR_ASSISTANT = basic_salary * 1.05;
    private final double MANAGER = basic_salary * 1.9;
    private final double SENIOR_MANAGER = basic_salary * 2.5;
    private final double PRESIDENT = basic_salary * 3.1;

    public Double position(String position){
        switch (position){
            case "사원": return ASSISTANT;
            case "대리": return SENIOR_ASSISTANT;
            case "차장": return MANAGER;
            case "부장": return SENIOR_MANAGER;
            case "사장": return PRESIDENT;
            default: return null;
        }
    }
}
