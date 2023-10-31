package erp.backend.domain.movie.controller;


import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.movie.dto.MovieDetailResponse;
import erp.backend.domain.movie.dto.MovieListResult;
import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.movie.repository.MovieRepository;
import erp.backend.domain.movie.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movie")
public class MovieController{

    @Value("${movie.key}")
    String key;
    private final MovieService movieService;
    private final MovieRepository movieRepository;

//    @GetMapping("/{id}")
//    public Movie movieSelect(@PathVariable String id) {
//        Movie movie = movieRepository.findById(id).orElse(null); //매핑, 레포지토리 -> 서비스로 수정예정
//        return movie;
//    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailResponse> movieDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok(movieService.movieDetail(id));
    }

    @ResponseBody
    @GetMapping("/getInfo")
    public String getInfo() {
        int pages = 1;
        try {
            for (int i = 1; i <= 5; i++) {
                String apiURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + key
                        + "&release_date.gte=2000-01-01&watch_region=KR&language=ko&page=" + i;
                URL url = new URL(apiURL);
                BufferedReader bf;
                bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
                String result = bf.readLine();
                System.out.println("@@@@@@@@@@@@@@@@@@@@@@"+result);
                movieService.getInfo(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }

    @GetMapping
    public ResponseEntity<MovieListResult> movieList(@PageableDefault(size = 7, sort = "movieId", direction = Sort.Direction.DESC) Pageable pageable,
                                                     Model model) {
        MovieListResult listResult = movieService.movieListResult(pageable);
        model.addAttribute("listResult", listResult);
        System.out.println("$$$$$$$$$"+listResult);
        return ResponseEntity.ok(listResult);
    }
}

