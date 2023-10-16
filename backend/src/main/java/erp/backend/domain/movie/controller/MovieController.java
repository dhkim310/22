package erp.backend.domain.movie.controller;

import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.movie.repository.MovieRepository;
import erp.backend.domain.movie.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movie")
public class MovieController{

//    @Value("${movie.key}")
    String key;
    private final MovieService movieService;
    private final MovieRepository movieRepository;

    @GetMapping("/{movie_id}")
    public Movie getMovieById(@PathVariable Long movie_id) {
        Movie movie = movieRepository.findById(movie_id).orElse(null);
        return movie;
    }
    @ResponseBody
    @GetMapping("/getInfo")
    public String getInfo() {
        int pages = 1;
        try {
            for (int i = 1; i <= 1; i++) {
                String apiURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + key
                        + "&release_date.gte=2013-01-01&watch_region=KR&language=ko&page=" + i;
                URL url = new URL(apiURL);
                BufferedReader bf;
                bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
                String result = bf.readLine();
                movieService.getInfo(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }
}

