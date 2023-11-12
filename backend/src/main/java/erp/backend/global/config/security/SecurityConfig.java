package erp.backend.global.config.security;

import erp.backend.global.config.security.jwt.JwtAuthenticationEntryPoint;
import erp.backend.global.config.security.jwt.JwtSecurityFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtSecurityFilter jwtSecurityFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(handling -> handling.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/api/main",
                                "/api/sign-in",
                                "/api/emp/tree",
                                "/api/emp/fix-info",
                                "/api/emp/fix-address",
                                "/api/emp/fix-detail-address",
                                "/api/emp/picture-update",
                                "/api/notice",
                                "/api/notice/{id}",
                                "/api/notice/first-list",
                                "/api/board",
                                "/api/board/{id}",
                                "/api/board/search",
                                "/api/comment/{boardId}",
                                "/api/comment/{id}",
                                "/api/approval",
                                "/api/approval/{id}",
                                "/api/approval/wait",
                                "/api/approval/success",
                                "/api/schedule",
                                "/api/log",
                                "/api/log/{id}",
                                "/api/memo",
                                "/api/message",
                                "/api/message/{id}",
                                "/api/message/test/{messageId}",
                                "/api/file/{uuid}",
                                "/api/vacation",
                                "/api/sign-up",
                                "/api/emp-list"
                        )
                        .permitAll()
                        .requestMatchers(
                                "/api/emp/hrm-list",
                                "/api/emp/hrm/{id}",
                                "/api/vacation",
                                "/api/vacation/{id}"
                        ).hasAnyRole("ADMIN_인사부", "USER_인사부")
                        .requestMatchers(
                                "/api/movie",
                                "/api/movie/getInfo",
                                "/api/movie/{id}",
                                "/api/serviceMovie/{movieId}",
                                "/api/serviceMovie/{id}",
                                "/api/serviceMovie"
                        ).hasAnyRole("ADMIN_콘텐츠관리부", "USER_콘텐츠관리부")
                        .requestMatchers(
                                "/api/member",
                                "/api/member/list",
                                "/api/member/detail/{id}"
                        ).hasAnyRole("ADMIN_회원관리부", "USER_회원관리부")
                        .requestMatchers(
                                "/api/emp/salary-list",
                                "/api/emp/salary/{empName}",
                                "/api/salary",
                                "/api/salary/list/{id}"
                        ).hasAnyRole("ADMIN_재무부", "USER_재무부")
                        .anyRequest().hasRole("USER"))
                .addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        // TODO 운영반영 시 addAllowedOriginPattern(https://domain.com) 주소로 변경
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}