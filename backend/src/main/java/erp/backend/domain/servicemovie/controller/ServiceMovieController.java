package erp.backend.domain.servicemovie.controller;

import erp.backend.domain.servicemovie.dto.ServiceMovieDetailResponse;
import erp.backend.domain.servicemovie.dto.ServiceMovieInsert;
import erp.backend.domain.servicemovie.dto.ServiceMovieListResult;
import erp.backend.domain.servicemovie.dto.ServiceMovieUpdate;
import erp.backend.domain.servicemovie.service.ServiceMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/serviceMovie")
public class ServiceMovieController {
    private final ServiceMovieService serviceMovieService;

    @GetMapping("/{id}")
    public ResponseEntity<ServiceMovieDetailResponse> serviceMovieDetail(@PathVariable("id") Long id) {
        return ResponseEntity.ok(serviceMovieService.serviceMovieDetail(id));
    }

    @PostMapping("/{movieId}")
    public ResponseEntity<Long> serviceMovieInsert(@PathVariable("movieId") String movieId, @RequestBody ServiceMovieInsert request) {
        return ResponseEntity.ok(serviceMovieService.serviceMovieInsert(movieId, request));
    }

    @DeleteMapping("/{id}")
    public void serviceMovieDelete(@PathVariable("id") Long id) {
        serviceMovieService.serviceMovieDelete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> serviceMovieUpdate(@PathVariable("id") Long id, @RequestBody ServiceMovieUpdate request) {
        return ResponseEntity.ok(serviceMovieService.serviceMovieUpdate(id, request));
    }

    @GetMapping
    public ResponseEntity<ServiceMovieListResult> serviceMovieList(@PageableDefault(size = 7, sort = "serviceMovieId", direction = Sort.Direction.DESC) Pageable pageable,
                                                                   Model model) {
        ServiceMovieListResult listResult = serviceMovieService.serviceMovieListResult(pageable);
        model.addAttribute("listResult", listResult);
        System.out.println("$$$$$$$$$" + listResult);
        return ResponseEntity.ok(listResult);
    }
}