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
public class MemberListResponse {
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private LocalDate memberJoinDate;
    private String memberRatePlan;
    private int memberPaymentPrice;
}
