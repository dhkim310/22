package erp.backend.domain.movie.dto;

import erp.backend.domain.movie.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieListResponse {
    private String id; // 영화 코드
    private String krName; //한글 제목
    private String ogName; // 원제
    private LocalDate releaseDate; // 개봉일
    private String rating; // 평점

    public static MovieListResponse fromMovie(Movie movie) {
        return MovieListResponse.builder()
                .id(movie.getMovieId())
                .krName(movie.getMovieKrName())
                .ogName(movie.getMovieOgName())
                .releaseDate(movie.getMovieReleaseDate())
                .rating(movie.getMovieRating())
                .build();
    }
}
