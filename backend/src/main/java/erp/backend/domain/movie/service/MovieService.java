package erp.backend.domain.movie.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

            movieRepository.save(
                    Movie.builder()
                            .movieId(contents.get("id").toString())
//                            .description(contents.get("overview").toString())
                            .movieKrname(contents.get("title").toString())
//                            .imgUrl(ImgUrl + contents.get("poster_path").toString().replaceAll(match, ""))
                            .movieMadeDate(dateTime)
                            .movieOpenDate(dateTime)
                            .build()
            );
        }
        return "ok";
    }

}