package erp.backend.domain.emp.dto;

import erp.backend.domain.dept.entity.Dept;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class reshuffleRequest {

    private Dept deptId;
    private String empPosition;
    private LocalDate empEndDate;
    private String empStatus;

}
