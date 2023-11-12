package erp.backend.domain.servicemovie.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceMovieDetailResponse {
    private Long id; //서비스영화 코드
    private String title; //영화제목
    private Long amount; //판권금액
    private LocalDate paymentDate; //판권금액지급일
    private String paymentBank; //지급은행
    private String accountNumber; //지급계좌
    private LocalDate startDate; //서비스 시작일
    private LocalDate endDate; //서비스 종료일
    private String producer; //제작사
}