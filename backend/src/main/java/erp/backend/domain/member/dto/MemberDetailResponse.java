package erp.backend.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailResponse {
    private String memberName;
    private String memberPhoneNumber;
    private LocalDate memberBirthDay;
    private String memberPaymentBank;
    private String memberAccountNumber;
}