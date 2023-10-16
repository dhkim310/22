package erp.backend.domain.movie.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Getter
@Builder
public class Movie {
    @Id
    @Column(name = "MOVIE_ID")
    private String movieId;

    @Column(name = "MOVIE_KRNAME")
    private String movieKrName;

    @Column(name = "MOVIE_OGNAME")
    private String movieOgName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//    @CreationTimestamp
    @Column(name = "MOVIE_RELEASEDATE")
    private LocalDate movieReleaseDate;

    @Column(name = "MOVIE_RATING")
    private String movieRating;

    @Column(name = "MOVIE_OVERVIEW")
    private String movieOverView;

    @Column(name = "MOVIE_POSTERPATH")
    private String moviePosterPath;

}
