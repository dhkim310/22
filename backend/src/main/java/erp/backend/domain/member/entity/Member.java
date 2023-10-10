package erp.backend.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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
