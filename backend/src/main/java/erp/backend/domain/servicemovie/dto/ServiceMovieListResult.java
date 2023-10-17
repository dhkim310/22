package erp.backend.domain.servicemovie.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@NoArgsConstructor
@Getter
public class ServiceMovieListResult {
    private Page<ServiceMovieListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public ServiceMovieListResult(int page, long totalCount, int size, Page<ServiceMovieListResponse> list) {
        this.page = page;
        this.totalCount = totalCount;
        this.size = size;
        this.list = list;
        this.totalPageCount = calTotalPageCount();
    }

    private long calTotalPageCount() {
        long tpc = totalCount / size;
        if (totalCount % size != 0)
            tpc++;
        return tpc;
    }
}