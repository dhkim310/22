package erp.backend.domain.member.service;

import erp.backend.domain.member.dto.MemberInsert;
import erp.backend.domain.member.entity.Member;
import erp.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

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
                .memberBirthDay(LocalDate.now())
                .memberBirthDay(request.getMemberBirthDay())
                .build();
        return memberRepository.save(entity).getMemberId();
    }
}
