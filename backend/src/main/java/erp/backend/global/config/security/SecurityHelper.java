package erp.backend.global.config.security;

import erp.backend.domain.emp.entity.Emp;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityHelper {
    public static Emp getAccount() {
        return getAccountFromContext().orElseThrow(() -> new AccessDeniedException("인증 정보가 없습니다."));
    }

    public static Optional<Emp> getAccountFromContext() {
        try {
            Emp employee = (Emp) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return Optional.of(employee); // Optional 안에 employee 넣는것, of
        } catch (Exception e) {
            return Optional.empty(); // 빈 값 전송
        }
    }
}
