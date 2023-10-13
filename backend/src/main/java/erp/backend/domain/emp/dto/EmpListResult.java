package erp.backend.domain.emp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class EmpListResult {
    private List<EmpListResponse> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public EmpListResult(int page, long totalCount, int size, List<EmpListResponse> list){
        this.page = page;
        this.size = size;
        this.totalCount = totalCount;
        this.list = list;
        this.totalPageCount = calTotalPageCount();
    }
    public long calTotalPageCount(){
        long tpc = totalCount / size;
        if (totalCount % size != 0){
            tpc++;
        }
        return tpc;
    }
}
