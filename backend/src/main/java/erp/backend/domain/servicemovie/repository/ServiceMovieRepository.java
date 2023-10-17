package erp.backend.domain.servicemovie.repository;

import erp.backend.domain.movie.entity.Movie;
import erp.backend.domain.servicemovie.entity.ServiceMovie;
import erp.backend.domain.vacation.entity.Vacation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceMovieRepository extends JpaRepository<ServiceMovie, Long> {
    ServiceMovie findByServiceMovieId(Long id);
}
