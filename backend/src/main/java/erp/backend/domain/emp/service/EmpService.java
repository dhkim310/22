package erp.backend.domain.emp.service;

import erp.backend.domain.emp.dto.*;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.salary.dto.SalaryResponse;
import erp.backend.domain.salary.entity.Salary;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.config.security.jwt.JwtProvider;
import erp.backend.global.mailsender.service.MailService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.function.EntityResponse;


import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public Page<Emp> findAll(Pageable pageable){
        System.err.println("pageable: " + pageable);
        return empRepository.findByOrderByEmpIdAsc(pageable);
    }

    @Transactional(readOnly = true)
    public EmpListResult getEmpListResult(Pageable pageable){
        Emp emp = SecurityHelper.getAccount();
        if (emp.getDept().getDeptId() == 10 || emp.getDept().getDeptId() == 20){
            Page<Emp> list = findAll(pageable);

            int page = pageable.getPageNumber();
            long totalCount = list.getTotalElements();
            int size = pageable.getPageSize();
            System.err.println("page: " + page + ", totalCount: " + totalCount + ", size: " + size);

            List<EmpListResponse> empList = list.getContent().stream()
                    .map(entity -> EmpListResponse.builder()
                            .empId(entity.getEmpId())
                            .empName(entity.getEmpName())
                            .empPosition(entity.getEmpPosition())
                            .empAmount(entity.getEmpAmount())
                            .dept(entity.getDept())
                            .build()
                    )
                    .collect(Collectors.toList());

            return new EmpListResult(page, totalCount, size, empList);
        }else {
            return null;
        }
    }
    @Transactional(readOnly = true)
    public Page<Emp> findName(Pageable pageable, String empName){
        return empRepository.findByEmpNameContainingOrderByEmpIdAsc(pageable, empName);
    }
    @Transactional(readOnly = true)
    public EmpListResult getEmpSearchList(Pageable pageable, String empName){
        Emp emp = SecurityHelper.getAccount();
        if (emp.getDept().getDeptId() == 10 || emp.getDept().getDeptId() == 20){
            Page<Emp> list = findName(pageable, empName);

            int page = pageable.getPageNumber();
            long totalCount = list.getTotalElements();
            int size = pageable.getPageSize();
            System.err.println("page: " + page + ", totalCount: " + totalCount + ", size: " + size);

            List<EmpListResponse> empList = list.getContent().stream()
                    .map(entity -> EmpListResponse.builder()
                            .empId(entity.getEmpId())
                            .empName(entity.getEmpName())
                            .empPosition(entity.getEmpPosition())
                            .empAmount(entity.getEmpAmount())
                            .dept(entity.getDept())
                            .build()
                    )
                    .collect(Collectors.toList());

            return new EmpListResult(page, totalCount, size, empList);
        }else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public EmpMainResponse empMainResponse() {
        Emp emp = SecurityHelper.getAccount();
        return EmpMainResponse.builder()
                .empName(emp.getEmpName())
                .empPosition(emp.getEmpPosition())
                .build();
    }
}
