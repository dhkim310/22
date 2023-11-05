package erp.backend.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@Getter
@Builder
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자

public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private long memberId;

    @Column(name = "MEMBER_NAME")
    private String memberName;

    @Column(name = "MEMBER_EMAIL")
    private String memberEmail;

    @Column(name = "MEMBER_PASSWORD")
    private String memberPassword;

    @Column(name = "MEMBER_PHONENUMBER")
    private String memberPhoneNumber;

    @Column(name = "MEMBER_BIRTHDAY")
    private LocalDate memberBirthDay;

    @Column(name = "MEMBER_JOINDATE")
    private LocalDate memberJoinDate;

    @Column(name = "MEMBER_RATEPLAN")
    private String memberRatePlan;

    @Column(name = "MEMBER_PAYMENTPRICE")
    private int memberPaymentPrice;

    @Column(name = "MEMBER_PAYMENTDATE")
    private LocalDateTime memberPaymentDate;

    @Column(name = "MEMBER_PAYMENTBANK")
    private String memberPaymentBank;

    @Column(name = "MEMBER_ACCOUNTNUMBER")
    private String memberAccountNumber;
}
