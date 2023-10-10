package erp.backend.domain.member.controller;

import erp.backend.domain.member.dto.MemberInsert;
import erp.backend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/create")
    public ResponseEntity<Long> createMember(@RequestBody MemberInsert request) {
        return ResponseEntity.ok(memberService.memberInsert(request));
    }
}
