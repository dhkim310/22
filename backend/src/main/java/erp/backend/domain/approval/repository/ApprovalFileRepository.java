package erp.backend.domain.approval.repository;

import erp.backend.domain.approval.entity.ApprovalFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalFileRepository extends JpaRepository<ApprovalFile, Long> {

}
