package erp.backend.domain.approval.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.approval.entity.Approval;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static erp.backend.domain.approval.entity.QApproval.approval;

@Repository
@RequiredArgsConstructor
public class ApprovalQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Approval> approvalList(String check) {
        return jpaQueryFactory
                .selectFrom(approval)
                .where(approval.approvalCheck.eq(check))
                .orderBy(approval.approvalId.desc())
                .fetch();
    }

    public List<Approval> approvalList() {
        return jpaQueryFactory
                .selectFrom(approval)
                .where(approval.approvalCheck.eq("결재요청")
                        .or(approval.approvalCheck.eq("결재반려")))
                .orderBy(approval.approvalId.desc())
                .fetch();
    }

    public long countByApprovalCheck(String id) {
        return jpaQueryFactory
                .select(approval.count())
                .from(approval)
                .where(approval.approvalCheckMan.eq(id)
                        .and(approval.approvalCheck.eq("결재요청")))
                .fetchOne();
    }
}