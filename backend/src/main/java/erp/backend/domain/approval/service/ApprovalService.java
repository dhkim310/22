package erp.backend.domain.approval.service;

import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.entity.Approval;
import erp.backend.domain.approval.repository.ApprovalRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ApprovalService {
    private ApprovalRepository approvalRepository;

    @Transactional
    public Long approvalInsert(ApprovalInsert request){
        Emp emp = SecurityHelper.getAccount();
        Approval entity = Approval.builder()
                .emp(emp)
                .approvalSubject(request.getApprovalSubject())
                .approvalContent(request.getApprovalContent())
                .approvalCheck("요청")
                .approvalCheckMan(request.getApprovalCheckMan())
                .approvalCheckManPosition(request.getApprovalCheckManPosition())
                .approvalUpLoadDate(LocalDate.now())
                .build();
        return approvalRepository.save(entity).getApprovalId();
    }
}
