package erp.backend.domain.servicemovie.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.movie.entity.Movie;
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
    private int serviceMovieAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
//  @CreationTimestamp
    @Column(name = "SERVICEMOVIE_PAYMENTDATE")
    private LocalDateTime serviceMoviePaymentDate;

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

    @Column(name = "SERVICEMOVIE_PRODUCERID")
    private String serviceMovieProducerId;
}
