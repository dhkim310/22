package erp.backend.domain.servicemovie.dto;

import erp.backend.domain.movie.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceMovieInsert {
    private Long serviceMovieId;
    private String MovieId;
    private long amount;
    private LocalDateTime paymentDate;
    private String paymentBank;
    private String accountNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private String producer;
}