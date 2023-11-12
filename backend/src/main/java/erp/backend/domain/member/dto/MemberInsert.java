package erp.backend.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class MemberInsert {
    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private String memberPhoneNumber;
    private LocalDate memberBirthDay;
    private LocalDate memberJoinDate;
    private String memberRatePlan;
    private int memberPaymentPrice;
    private LocalDateTime memberPaymentDate;
    private String memberPaymentBank;
    private String memberAccountNumber;

}