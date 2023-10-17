package erp.backend.domain.servicemovie.controller;

import erp.backend.domain.notice.dto.NoticeUpdate;
import erp.backend.domain.servicemovie.dto.ServiceMovieInsert;
import erp.backend.domain.servicemovie.dto.ServiceMovieUpdate;
import erp.backend.domain.servicemovie.service.ServiceMovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/serviceMovie")
public class ServiceMovieController {

    private final ServiceMovieService serviceMovieService;
    @PostMapping("/{movieId}")
    public ResponseEntity<Long> serviceMovieInsert(@PathVariable("movieId") String movieId, @RequestBody ServiceMovieInsert request) {
        return ResponseEntity.ok(serviceMovieService.serviceMovieInsert(movieId, request));
    }

    @DeleteMapping("/{id}")
    public void serviceMovieDelete(@PathVariable("id") Long id) {
        serviceMovieService.serviceMovieDelete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> serviceMovieUpdate(@PathVariable("id") Long id, @RequestBody ServiceMovieUpdate request){
        return ResponseEntity.ok(serviceMovieService.serviceMovieUpdate(id, request));
    }
}
