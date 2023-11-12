package erp.backend.domain.dept.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.emp.dto.DeptEmpList;
import erp.backend.domain.emp.dto.EmpTreeList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static erp.backend.domain.dept.entity.QDept.dept;
import static erp.backend.domain.emp.entity.QEmp.emp;

@Repository
@RequiredArgsConstructor
public class DeptQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public DeptEmpList getDeptAndEmp(String deptName) {
        List<EmpTreeList> empTreeList = jpaQueryFactory
                .select(emp)
                .from(emp)
                .join(emp.dept, dept).on(emp.dept.eq(dept))
                .where(conditionDeptName(deptName))
                .fetch()
                .stream()
                .map(e -> EmpTreeList.builder()
                        .empId(e.getEmpId())
                        .empName(e.getEmpName())
                        .build())
                .collect(Collectors.toList());

        return DeptEmpList.from(deptName, empTreeList);
    }

    public BooleanExpression conditionDeptName(String deptName) {
        return deptName != null ? dept.deptName.contains(deptName) : null;
    }

}