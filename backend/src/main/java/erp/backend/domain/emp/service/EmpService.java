package erp.backend.domain.emp.service;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.config.security.jwt.JwtProvider;
import erp.backend.global.mailsender.service.MailService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpService {
    private final EmpRepository empRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final MailService mailService;

    @Transactional
    public void signUp(SignUpRequest request) {
        // 신입 사원은 초기 비밀번호가 1541로 설정
        Emp emp = Emp.builder()
                .empName(request.getEmpName())
                .empEmail(request.getEmpEmail())
                .dept(request.getEmpDeptId())
                .password(passwordEncoder.encode("1541")) // 사원의 초기 비밀번호 1541
                .empPosition(request.getEmpPosition())
                .roles(request.getRoles())
                .empAmount(request.getEmpAmount())
                .empBirthday(request.getEmpBirthday())
                .empPhoneNumber(request.getEmpPhoneNumber())
                .empAddress(request.getEmpAddress())
                .empDetailAddress(request.getEmpDetailAddress())
                .empGender(request.getEmpGender())
                .empStartDate(request.getEmpStartDate())
                .empStatus("재직중")
                .build();
        empRepository.save(emp);
    }

    @Transactional(readOnly = true)
    public SignInResponse signIn(SignInRequest request, HttpServletResponse httpResponse) {
        Emp emp = empRepository.findByEmpEmail(request.getEmpEmail())
                .orElseThrow(() -> new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다."));
        String encPassword = emp.getPassword();
        boolean matches = passwordEncoder.matches(request.getPassword(), encPassword);
        if (!matches) {
            throw new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다.");
        }

        String token = jwtProvider.createToken(emp.getEmpEmail(), emp.getAuthorities());
        List<String> roles = Arrays.stream(emp.getRoles().split(",")).toList();
        String encode = URLEncoder
                .encode("Bearer ", StandardCharsets.UTF_8)
                .replaceAll("\\+", "%20")
                + token;
        Cookie cookie = new Cookie("Authorization", encode);
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        cookie.setPath("/");

        httpResponse.addCookie(cookie);
        return SignInResponse.builder()
                .token(token)
                .empId(emp.getEmpId())
                .empName(emp.getEmpName())
                .empEmail(emp.getEmpEmail())
                .roles(roles)
                .build();

    }

    @Transactional(readOnly = true)
    public EmpDetailResponse empDetailResponse() {
        Emp emp = SecurityHelper.getAccount();

        return EmpDetailResponse.builder()
                .empName(emp.getEmpName())
                .dept(emp.getDept().getDeptName())
                .empPosition(emp.getEmpPosition())
                .empPhoneNumber(emp.getEmpPhoneNumber())
                .empBirthday(emp.getEmpBirthday())
                .empStartDate(emp.getEmpStartDate())
                .empAddress(emp.getEmpAddress())
                .empDetailAddress(emp.getEmpDetailAddress())
                .empEmail(emp.getEmpEmail())
                .password(emp.getPassword())
                .build();

    }

    @Transactional
    public Long passwordUpdate(EmpPasswordUpdateRequest request) {
        Emp emp = SecurityHelper.getAccount();
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        emp.updatePassword(encodedPassword);
        empRepository.save(emp);
        try {
            mailService.sendSimpleMessage(emp.getEmpEmail());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return emp.getEmpId();
    }
    @Transactional
    public List<EmpListResponse> empList() {
        Emp emp = SecurityHelper.getAccount();
        List<Emp> list = empRepository.findAll();

        return list.stream()
                .map(emp1 -> EmpListResponse.builder()
                        .empName(emp.getEmpName())
                        .empId(emp.getEmpId())
                        .empPosition(emp.getEmpPosition())
                        .build()
                )
                .toList();
    }
}
