package erp.backend.domain.salary.Vo;

import erp.backend.domain.salary.dto.SalaryInsert;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
@Getter
@Setter
public class SalaryVO {
    SalaryInsert salaryInsert = new SalaryInsert();
    private final double amount = 30000000;
    private final double ASSISTANT = amount;
    private final double SENIOR_ASSISTANT = amount * 1.1;
    private final double MANAGER = amount * 1.45;
    private final double SENIOR_MANAGER = amount * 2.25;
    private final double PRESIDENT = amount * 3.5;

    private final double nationalInsurance = 0.045;
    private final double healthInsurance = 0.03335;
    private final double nursingInsurance = healthInsurance * 0.1025;
    private final double employmentInsurance = 0.008;

    private final double year = 12;
    private double bonus;

    public double getBonus(){
        return bonus;
    }
    public void setBonus(double bonus){
        this.bonus = bonus;
    }

    private final double tax = (((amount / year)) * nationalInsurance) + ((amount/year) * healthInsurance) +
            ((amount/year)) * nursingInsurance + ((amount/year)) * employmentInsurance;

    // 실수령액
    public Double paymoney(String position) {
        Double pay = null;
        Double tax1 = taxmoney(position);
        switch (position) {
            case "사원":
                pay = (ASSISTANT/year) + bonus - tax1;
                break;
            case "대리":
                pay = Math.floor(SENIOR_ASSISTANT/year) + bonus - tax1;
                break;
            case "과장":
                pay = (MANAGER/year) + bonus - tax1;
                break;
            case "부장":
                pay = (SENIOR_MANAGER/year) + bonus - tax1;
                break;
            case "사장":
                pay = (PRESIDENT/year) + bonus - tax1;
                break;
            default:
                break;
        }
        if (pay == null){
            return pay;
        }
        return pay;
    }

    // 제세공과금
    public Double taxmoney(String position) {
        Double tax1 = null;
        switch (position) {
            case "사원":
                tax1 = Math.floor(tax);
                break;
            case "대리":
                tax1 = Math.floor(tax * 1.1);
                break;
            case "과장":
                tax1 = Math.floor(tax * 1.45);
                break;
            case "부장":
                tax1 = Math.floor(tax * 2.25);
                break;
            case "사장":
                tax1 = Math.floor(tax * 3.5);
                break;
            default:
                break;
        }
        if (tax1 == null){
            return tax1;
        }
        return tax1;
    }
}