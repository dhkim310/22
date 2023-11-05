package erp.backend.domain.servicemovie.service;

import erp.backend.domain.board.dto.BoardDetailResponse;
import erp.backend.domain.board.entity.Board;
import erp.backend.domain.board.entity.BoardFile;
import erp.backend.domain.comment.dto.CommentResponse;
import erp.backend.domain.comment.entity.Comment;
import erp.backend.domain.movie.repository.MovieRepository;
import erp.backend.domain.servicemovie.dto.*;
import erp.backend.domain.servicemovie.entity.ServiceMovie;
import erp.backend.domain.servicemovie.repository.ServiceMovieRepository;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
@Slf4j
public class ServiceMovieService {

    private final ServiceMovieRepository serviceMovieRepository;
    private final MovieRepository movieRepository;

    @Transactional(readOnly = true)
    public ServiceMovieDetailResponse serviceMovieDetail(Long id) {
        ServiceMovie entity = serviceMovieRepository.findByServiceMovieId(id);

        return ServiceMovieDetailResponse.builder()
                .id(entity.getServiceMovieId())
                .title(entity.getServiceMovieMovieId().getMovieKrName())
                .amount(entity.getServiceMovieAmount())
                .paymentDate(entity.getServiceMoviePaymentDate())
                .paymentBank(entity.getServiceMoviePaymentBank())
                .accountNumber(entity.getServiceMovieAccountNumber())
                .startDate(entity.getServiceMovieStartDate())
                .endDate(entity.getServiceMovieEndDate())
                .producer(entity.getServiceMovieProducer())
                .build();
    }

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
    @Transactional(readOnly = true)
    public ServiceMovieListResult serviceMovieListResult(Pageable pageable) {
        List<ServiceMovie> list = serviceMovieRepository.findAll(Sort.by(Sort.Order.desc("serviceMovieId")));
        List<ServiceMovieListResponse> serviceMovieListResponses = new ArrayList<>();

        for (ServiceMovie serviceMovie : list) {
            ServiceMovieListResponse response = ServiceMovieListResponse.fromServiceMovie(serviceMovie);
            serviceMovieListResponses.add(response);
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), serviceMovieListResponses.size());
        List<ServiceMovieListResponse> sublist = serviceMovieListResponses.subList(start, end);

        Page<ServiceMovieListResponse> page = new PageImpl<>(sublist, pageable, serviceMovieListResponses.size());

        return new ServiceMovieListResult(pageable.getPageNumber(), serviceMovieListResponses.size(), pageable.getPageSize(), page);
    }
}
