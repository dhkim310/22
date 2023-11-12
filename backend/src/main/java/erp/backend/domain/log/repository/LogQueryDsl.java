package erp.backend.domain.log.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.log.entity.Log;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static erp.backend.domain.emp.entity.QEmp.emp;
import static erp.backend.domain.log.entity.QLog.log;

@Repository
@RequiredArgsConstructor
public class LogQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public Log log(Long empId) {
        return jpaQueryFactory
                .selectFrom(log)
                .innerJoin(log.emp, emp).fetchJoin()
                .where(conditionEmpId(empId))
                .orderBy(log.logId.desc())
                .fetchFirst();
    }

    public BooleanExpression conditionEmpId(Long empId) {
        return empId != null ? log.emp.empId.eq(empId) : null;
    }
}