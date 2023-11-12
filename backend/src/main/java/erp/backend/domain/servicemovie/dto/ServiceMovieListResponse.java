package erp.backend.domain.servicemovie.dto;

import erp.backend.domain.servicemovie.entity.ServiceMovie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceMovieListResponse {
    private Long id; //서비스영화 코드
    private String title; //영화제목
    private Long amount; //판권금액
    private LocalDate paymentDate; //판권금액지급일
    private String paymentBank; //지급은행
    private String accountNumber; //지급계좌
    private LocalDate startDate; //서비스 시작일
    private LocalDate endDate; //서비스 종료일
    private String producer; //제작사

    public static ServiceMovieListResponse fromServiceMovie(ServiceMovie serviceMovie) {
        return ServiceMovieListResponse.builder()
                .id(serviceMovie.getServiceMovieId())
                .title(serviceMovie.getServiceMovieMovieId().getMovieKrName())
                .amount(serviceMovie.getServiceMovieAmount())
                .paymentDate(serviceMovie.getServiceMoviePaymentDate())
                .paymentBank(serviceMovie.getServiceMoviePaymentBank())
                .accountNumber(serviceMovie.getServiceMovieAccountNumber())
                .startDate(serviceMovie.getServiceMovieStartDate())
                .endDate(serviceMovie.getServiceMovieEndDate())
                .producer(serviceMovie.getServiceMovieProducer())
                .build();
    }
}