package erp.backend.domain.movie.repository;

import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.vacation.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MovieRepository extends JpaRepository<Movie, String> {
    Movie findByMovieId(String MovieId);
}

