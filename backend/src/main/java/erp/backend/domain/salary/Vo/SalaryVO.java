package erp.backend.domain.salary.Vo;

import java.time.LocalDateTime;

public class SalaryVO {
    public LocalDateTime today = LocalDateTime.now().withDayOfMonth(15).withHour(9).withMinute(0).withSecond(0);
    private double basic_salary = 2200000;
    private final double ASSISTANT = basic_salary;
    private final double SENIOR_ASSISTANT = basic_salary * 1.05;
    private final double MANAGER = basic_salary * 1.9;
    private final double SENIOR_MANAGER = basic_salary * 2.5;
    private final double PRESIDENT = basic_salary * 3.1;

    public String month(LocalDateTime month){
        return null;
    }
}
