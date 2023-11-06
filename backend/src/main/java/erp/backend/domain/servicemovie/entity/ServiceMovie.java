package erp.backend.domain.servicemovie.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.servicemovie.dto.ServiceMovieUpdate;
import erp.backend.domain.vacation.dto.VacationUpdate;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Getter
@Builder
@Table(name = "servicemovie")
public class ServiceMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SERVICEMOVIE_ID")
    private long serviceMovieId;
    //외래키
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SERVICEMOVIE_MOVIE_ID", referencedColumnName = "MOVIE_ID", updatable = false)
    private Movie serviceMovieMovieId;

    @Column(name = "SERVICEMOVIE_AMOUNT")
    private long serviceMovieAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//  @CreationTimestamp
    @Column(name = "SERVICEMOVIE_PAYMENTDATE")
    private LocalDate serviceMoviePaymentDate;

    @Column(name = "SERVICEMOVIE_PAYMENTBANK")
    private String serviceMoviePaymentBank;

    @Column(name = "SERVICEMOVIE_ACCOUNTNUMBER")
    private String serviceMovieAccountNumber;

    @Column(name = "SERVICEMOVIE_STARTDATE")
    private LocalDate serviceMovieStartDate;

    @Column(name = "SERVICEMOVIE_ENDDATE")
    private LocalDate serviceMovieEndDate;

    @Column(name = "SERVICEMOVIE_PRODUCER")
    private String serviceMovieProducer;
    public void update(ServiceMovieUpdate request) {
        this.serviceMovieAmount = request.getAmount();
        this.serviceMoviePaymentDate = request.getPaymentDate().plusDays(1);
        this.serviceMoviePaymentBank = request.getPaymentBank();
        this.serviceMovieAccountNumber = request.getAccountNumber();
        this.serviceMovieStartDate = request.getStartDate().plusDays(1);
        this.serviceMovieEndDate = request.getEndDate().plusDays(1);
        this.serviceMovieProducer = request.getProducer();
    }
}
