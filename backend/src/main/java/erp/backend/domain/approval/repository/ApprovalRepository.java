package erp.backend.domain.approval.repository;

import erp.backend.domain.approval.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRepository extends JpaRepository <Approval, Long> {
    Approval findByApprovalId(Long id);
}
