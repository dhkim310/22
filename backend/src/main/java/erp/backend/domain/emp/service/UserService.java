package erp.backend.domain.emp.service;
import erp.backend.domain.emp.dto.SignInRequest;
import erp.backend.domain.emp.dto.SignInResponse;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.global.config.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final EmpRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public SignInResponse signIn(SignInRequest request) {
        Emp user = userRepository.findByEmpEmail(request.getEmpEmail())
                .orElseThrow(() -> new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다."));
        String encPassword = user.getPassword();
        boolean matches = passwordEncoder.matches(request.getPassword(), encPassword);
        if (!matches) {
            throw new UsernameNotFoundException("이메일/비밀번호가 맞지않습니다.");
        }

        String token = jwtProvider.createToken(user.getEmpEmail(), user.getAuthorities());

        List<String> roles = Arrays.stream(user.getRoles().split(",")).toList();

        return SignInResponse.builder()
                .token(token)
                .empId(user.getEmpId())
                .empName(user.getEmpName())
                .empEmail(user.getEmpEmail())
                .roles(roles)
                .build();

    }

}
