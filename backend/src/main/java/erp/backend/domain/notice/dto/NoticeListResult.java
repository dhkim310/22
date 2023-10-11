package erp.backend.domain.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeListResult {
    private Page<NoticeListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public NoticeListResult(int page, long totalCount, int size, Page<NoticeListResponse> list) {
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
