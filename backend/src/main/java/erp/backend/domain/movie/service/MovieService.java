package erp.backend.domain.movie.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import erp.backend.domain.movie.dto.MovieListResponse;
import erp.backend.domain.movie.dto.MovieListResult;
import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class MovieService {
    private final MovieRepository movieRepository;

    LocalDate dateTime = LocalDate.now();

    @Transactional
    public String getInfo(String result) {

        JsonArray list = null;

        log.info("서비스 시작" );
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = (JsonObject) jsonParser.parse(result);
        list = (JsonArray) jsonObject.get("results");

        for (int k = 0; k < list.size(); k++) {
            JsonObject contents = (JsonObject) list.get(k);

            String ImgUrl = "https://image.tmdb.org/t/p/w200";
            String match = "[\"]";

            LocalDate releaseDate = LocalDate.parse(contents.get("release_date").toString().replaceAll(match, ""));
            System.out.println(releaseDate);

            movieRepository.save(
                    Movie.builder()
                            .movieId(contents.get("id").toString())
                            .movieKrName(contents.get("title").toString())
                            .movieOgName(contents.get("original_title").toString())
                            .moviePosterPath(ImgUrl + contents.get("poster_path").toString().replaceAll(match, ""))
                            .movieReleaseDate(releaseDate)
                            .movieRating(contents.get("vote_average").toString())
                            .movieOverView(contents.get("overview").toString())
                            .build()
            );
            System.out.println("$$$$$$$$$"+contents.get("id").toString());
            System.out.println("$$$$$$$$$"+contents.get("title").toString());
        }
        return "ok";
    }

    @Transactional(readOnly = true)
    public MovieListResult movieListResult(Pageable pageable) {
        List<Movie> list = movieRepository.findAll(Sort.by(Sort.Order.desc("movieId")));
        List<MovieListResponse> movieListResponses = new ArrayList<>();

        for (Movie movie : list) {
            MovieListResponse response = MovieListResponse.fromMovie(movie);
            movieListResponses.add(response);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), movieListResponses.size());
        List<MovieListResponse> sublist = movieListResponses.subList(start, end);

        Page<MovieListResponse> page = new PageImpl<>(sublist, pageable, movieListResponses.size());

        return new MovieListResult(pageable.getPageNumber(), movieListResponses.size(), pageable.getPageSize(), page);
    }
}