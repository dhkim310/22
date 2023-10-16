package erp.backend.domain.movie.repository;

import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.salary.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, String> {
}

