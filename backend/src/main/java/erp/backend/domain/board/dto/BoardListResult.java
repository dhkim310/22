package erp.backend.domain.board.dto;

import erp.backend.domain.board.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@NoArgsConstructor
@Getter
public class BoardListResult {
    private Page<BoardListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public BoardListResult(int page, long totalCount, int size, Page<BoardListResponse> list) {
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
