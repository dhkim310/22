package erp.backend.domain.servicemovie.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class ServiceMovie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SERVICEMOVIE_ID")
    private long serviceMovieId;
    //외래키
    @Column(name = "SERVICEMOVIE_MOVIE_ID")
    private String serviceMovieMovieId;

    @Column(name = "SERVICEMOVIE_AMOUNT")
    private int serviceMovieAmount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "SERVICEMOVIE_PAYMENTDATE")
    private Date serviceMoviePaymentDate;

    @Column(name = "SERVICEMOVIE_PAYMENTBANK")
    private String serviceMoviePaymentBank;

    @Column(name = "SERVICEMOVIE_ACCOUNTNUMBER")
    private String serviceMovieAccountNumber;
}
