package erp.backend.domain.member.controller;

import erp.backend.domain.member.dto.MemberDetailResponse;
import erp.backend.domain.member.dto.MemberInsert;
import erp.backend.domain.member.dto.MemberListResponse;
import erp.backend.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Long> createMember(@RequestBody MemberInsert request) {
        return ResponseEntity.ok(memberService.memberInsert(request));
    }
    @GetMapping("/list")
    public ResponseEntity<List<MemberListResponse>> getMemberList(){
        return ResponseEntity.ok(memberService.getMemberList());
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<MemberDetailResponse> getMemberDetail(@PathVariable Long id){
        return ResponseEntity.ok(memberService.getMemberDetail(id));
    }
}
