package erp.backend.domain.movie.repository;

import erp.backend.domain.movie.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MovieRepository extends JpaRepository<Movie, String> {
}

