package erp.backend.domain.approval.repository;

import erp.backend.domain.approval.entity.ApprovalFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalFileRepository extends JpaRepository<ApprovalFile, Long> {
    List<ApprovalFile> findByApproval_ApprovalId(Long id);
}