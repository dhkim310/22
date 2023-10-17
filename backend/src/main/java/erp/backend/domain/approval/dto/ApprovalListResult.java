package erp.backend.domain.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalListResult {
    private Page<ApprovalListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public ApprovalListResult(int page, long totalCount, int size, Page<ApprovalListResponse> list) {
        this.page = page;
        this.totalCount = totalCount;
        this.size = size;
        this.list = list;
        this.totalPageCount = calTotalPageCount();
    }
    private long calTotalPageCount() {
        long tpc = totalCount / size;
        System.out.println("totalCount : " + totalCount);
        System.out.println("size : " + size);
        if (totalCount % size != 0)
            tpc++;
        return tpc;
    }
}
