package erp.backend.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeptEmpList {
    private String departmentName;
    private List<EmpTreeList> employees;

    public static DeptEmpList from(String deptName, List<EmpTreeList> empTreeList) {
        return DeptEmpList.builder()
                .departmentName(deptName)
                .employees(empTreeList)
                .build();
    }
}