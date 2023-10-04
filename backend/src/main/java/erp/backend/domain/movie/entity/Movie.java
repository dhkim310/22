package erp.backend.domain.movie.entity;

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
public class Movie {
    @Id
    @Column(name = "MOVIE_ID")
    private String movieId;

    @Column(name = "MOVIE_KRNAME")
    private String movieKrname;

    @Column(name = "MOVIE_ENGNAME")
    private String movieEngName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "MOVIE_MADEDATE")
    private Date movieMadeDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "MOVIE_OPENDATE")
    private Date movieOpenDate;

    @Column(name = "MOVIE_STATUS")
    private String movieStatus;

    @Column(name = "MOVIE_COUNTRY")
    private String movieCountry;

    @Column(name = "MOVIE_GENRE")
    private String movieGenre;

    @Column(name = "MOVIE_PRODUCER")
    private String movieProducer;

    @Column(name = "MOVIE_PRODUCERID")
    private String movieProducerId;
}
