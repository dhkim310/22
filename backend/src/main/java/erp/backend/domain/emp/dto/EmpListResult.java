package erp.backend.domain.emp.dto;

import erp.backend.domain.emp.entity.Emp;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@NoArgsConstructor
@Getter
public class EmpListResult {
    private Page<Emp> list;
    private int page;
    private int size;
    private long totalCount;
    private long totalPageCount;

    public EmpListResult(int page, int size, long totalCount, Page<Emp> list){
        this.page = page;
        this.size = size;
        this.totalCount = totalCount;
        this.list = list;
    }
    public long calTotalPageCount(){
        long tpc = totalCount / size;
        if (totalCount % size != 0){
            tpc++;
        }
        return tpc;
    }
}
