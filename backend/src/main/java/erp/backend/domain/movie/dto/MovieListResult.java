package erp.backend.domain.movie.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@NoArgsConstructor
@Getter
public class MovieListResult {
    private Page<MovieListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public MovieListResult(int page, long totalCount, int size, Page<MovieListResponse> list) {
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
