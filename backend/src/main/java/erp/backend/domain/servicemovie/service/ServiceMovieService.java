package erp.backend.domain.servicemovie.service;


import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.servicemovie.entity.ServiceMovie;
import erp.backend.domain.servicemovie.repository.ServiceMovieRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class ServiceMovieService {

//    private final ServiceMovieRepository serviceMovieRepository;
//
//    @Transactional
//    public Long ServiceMovieInsert(ServiceMovieRequest request) {
//
//        ServiceMovie entity = ServiceMovie.builder()
//
//                .build();
//        ServiceMovieRepository.save(entity);
//
//    }
}
