package erp.backend.domain.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성

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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "MEMBER_BIRTHDAY")
    private Date memberBirthDay;

    @Column(name = "MEMBER_RATEPLAN")
    private String memberRatePlan;

    @Column(name = "MEMBER_PAYMENTPRICE")
    private int memberPaymentPrice;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "MEMBER_PAYMENTDATE")
    private Date memberPaymentDate;

    @Column(name = "MEMBER_PAYMENTBANK")
    private String memberPaymentBank;

    @Column(name = "MEMBER_ACCOUNTNUMBER")
    private String memberAccountNumber;
}
