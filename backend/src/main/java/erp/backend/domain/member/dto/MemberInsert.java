package erp.backend.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MemberInsert {

    private String memberName;
    private String memberEmail;
    private String memberPassword;
    private String memberPhoneNumber;
    private LocalDate memberBirthDay;
}
