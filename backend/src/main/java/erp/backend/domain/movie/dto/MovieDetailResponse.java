package erp.backend.domain.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailResponse {
    private String id; // 영화 코드
    private String krName; //한글 제목
    private String ogName; // 원제
    private String movieOverView; // 줄거리
    private String moviePosterPath; // 이미지
}