package erp.backend.domain.approval.repository;

import erp.backend.domain.approval.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    Approval findByApprovalId(Long id);

    @Query("SELECT n FROM Approval n")
    List<Approval> findAll();
}
