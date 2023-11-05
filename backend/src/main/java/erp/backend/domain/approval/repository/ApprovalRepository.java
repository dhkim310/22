package erp.backend.domain.approval.repository;

import erp.backend.domain.approval.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    Approval findByApprovalId(Long id);


    @Query("SELECT n FROM Approval n")
    List<Approval> findAll();
    @Query("SELECT a FROM Approval a WHERE a.approvalCheck = '결재요청' OR a.approvalCheck = '결재반려' ORDER BY a.approvalId DESC")
    List<Approval> findByApprovalCheckOrderByApprovalIdDesc();
    List<Approval> findByApprovalCheckOrderByApprovalIdDesc(String check);

    @Query("SELECT COUNT(a) FROM Approval a WHERE a.approvalCheckMan = :id AND (a.approvalCheck = '결재요청')")
    long countByApprovalCheck(@Param("id") String id);
}
