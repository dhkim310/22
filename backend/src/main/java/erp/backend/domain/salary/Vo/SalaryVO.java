package erp.backend.domain.salary.Vo;

import java.time.LocalDateTime;

public class SalaryVO {
    double amount = 30000000;
    private final double ASSISTANT = amount;
    private final double SENIOR_ASSISTANT = amount * 1.1;
    private final double MANAGER = amount * 1.45;
    private final double SENIOR_MANAGER = amount * 2.25;
    private final double PRESIDENT = amount * 3.5;

    private final double nationalInsurance = 0.045;
    private final double healthInsurance = 0.03495;
    private final double nursingInsurance = healthInsurance * 0.1227;
    private final double employmentInsurance = 0.009;

    private final double paymoney = nationalInsurance * healthInsurance * nursingInsurance * employmentInsurance;

    // 실수령액
    public Double paymoney(String position){
        Double pay = null;
        switch (position){
            case "사원": pay = ASSISTANT * paymoney; break;
            case "대리": pay = SENIOR_ASSISTANT * paymoney; break;
            case "차장": pay = MANAGER * paymoney; break;
            case "부장": pay = SENIOR_MANAGER * paymoney; break;
            case "사장": pay = PRESIDENT * paymoney; break;
            default: break;
        }
        if (pay != null) {
            Double taxAmount = tax(pay);
        }
        return pay;
    }
    public Double tax(double pay){
        return null;
    }
}
