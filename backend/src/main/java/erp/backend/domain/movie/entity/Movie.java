package erp.backend.domain.movie.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String movie_id;

    private String movie_krname;

    private String movie_enname;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date movie_madedate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    @CreationTimestamp
    private Date movie_opendate;

    private String movie_status;

    private String movie_country;

    private String movie_genre;

    private String movie_producer;

    private String movie_producerid;
}
