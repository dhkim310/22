package erp.backend.domain.member.service;

import erp.backend.domain.member.dto.MemberDetailResponse;
import erp.backend.domain.member.dto.MemberInsert;
import erp.backend.domain.member.dto.MemberListResponse;
import erp.backend.domain.member.entity.Member;
import erp.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long memberInsert(MemberInsert request) {
        Member entity = Member.builder()
                .memberName(request.getMemberName())
                .memberEmail(request.getMemberEmail())
                .memberPassword(request.getMemberPassword())
                .memberPhoneNumber(request.getMemberPhoneNumber())
                .memberBirthDay(request.getMemberBirthDay())
                .memberJoinDate(LocalDate.now())
                .memberRatePlan("젤 좋은거")
                .memberPaymentPrice(request.getMemberPaymentPrice())
                .memberPaymentDate(LocalDateTime.now().withYear(1999).withMinute(0).withSecond(0))
                .memberPaymentBank(request.getMemberPaymentBank())
                .memberAccountNumber(request.getMemberAccountNumber())
                .build();
        return memberRepository.save(entity).getMemberId();
    }

    @Transactional(readOnly = true)
    public List<MemberListResponse> getMemberList() {
        List<Member> list = memberRepository.findAll();
        return list.stream()
                .map(member -> MemberListResponse.builder()
                        .memberId(member.getMemberId())
                        .memberName(member.getMemberName())
                        .memberEmail(member.getMemberEmail())
                        .memberJoinDate(member.getMemberJoinDate())
                        .memberRatePlan(member.getMemberRatePlan())
                        .memberPaymentPrice(member.getMemberPaymentPrice())
                        .build()
                ).toList();
    }

    @Transactional(readOnly = true)
    public MemberDetailResponse getMemberDetail(Long id) {
        Member entity = memberRepository.findByMemberId(id);
        return MemberDetailResponse.builder()
                .memberName(entity.getMemberName())
                .memberAccountNumber(entity.getMemberAccountNumber())
                .memberPaymentBank(entity.getMemberPaymentBank())
                .memberBirthDay(entity.getMemberBirthDay())
                .memberPhoneNumber(entity.getMemberPhoneNumber())
                .build();
    }

}