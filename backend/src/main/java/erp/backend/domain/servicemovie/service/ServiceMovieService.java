package erp.backend.domain.servicemovie.service;



import erp.backend.domain.movie.repository.MovieRepository;
import erp.backend.domain.servicemovie.dto.ServiceMovieInsert;
import erp.backend.domain.servicemovie.dto.ServiceMovieUpdate;
import erp.backend.domain.servicemovie.entity.ServiceMovie;
import erp.backend.domain.servicemovie.repository.ServiceMovieRepository;
import erp.backend.domain.vacation.dto.VacationUpdate;
import erp.backend.domain.vacation.entity.Vacation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@RequiredArgsConstructor
@Service
@Slf4j
public class ServiceMovieService {

    private final ServiceMovieRepository serviceMovieRepository;
    private final MovieRepository movieRepository;

    @Transactional
    public Long serviceMovieInsert(String movieId, ServiceMovieInsert request) {

        ServiceMovie entity = ServiceMovie.builder()
                .serviceMovieMovieId(movieRepository.findByMovieId(movieId))
                .serviceMovieAmount(request.getAmount())
                .serviceMoviePaymentDate(request.getPaymentDate())
                .serviceMoviePaymentBank(request.getPaymentBank())
                .serviceMovieAccountNumber(request.getAccountNumber())
                .serviceMovieStartDate(request.getStartDate())
                .serviceMovieEndDate(request.getEndDate())
                .serviceMovieProducer(request.getProducer())
                .build();
        return serviceMovieRepository.save(entity).getServiceMovieId();
    }

    @Transactional
    public void serviceMovieDelete(Long id) {
        ServiceMovie entity = serviceMovieRepository.findByServiceMovieId(id);
        serviceMovieRepository.delete(entity);
    }

    @Transactional
    public Long serviceMovieUpdate(Long id, ServiceMovieUpdate request) {
        ServiceMovie entity = serviceMovieRepository.findByServiceMovieId(id);
        entity.update(request);
        return entity.getServiceMovieId();
    }
}
