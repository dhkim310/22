package erp.backend.domain.approval.service;

import erp.backend.domain.approval.dto.ApprovalDetailResponse;
import erp.backend.domain.approval.dto.ApprovalInsert;
import erp.backend.domain.approval.dto.ApprovalListResponse;
import erp.backend.domain.approval.dto.ApprovalUpdate;
import erp.backend.domain.approval.entity.Approval;
import erp.backend.domain.approval.entity.ApprovalFile;
import erp.backend.domain.approval.repository.ApprovalFileRepository;
import erp.backend.domain.approval.repository.ApprovalRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static erp.backend.global.util.ArrayUtils.isNullOrEmpty;

@Service
@RequiredArgsConstructor
public class ApprovalService {
    private final ApprovalRepository approvalRepository;
    private final ApprovalFileRepository approvalFileRepository;

    private final UploadFileService uploadFileService;

    @Transactional(readOnly = true)
    public List<ApprovalListResponse> searchList() {
        List<Approval> list = approvalRepository.findAll();

        return list.stream()
                .map(approval -> ApprovalListResponse.builder()
                        .approvalId(approval.getApprovalId())
                        .approvalSubject(approval.getApprovalSubject())
                        .approvalCheckMan(approval.getApprovalCheckMan())
                        .approvalCheck(approval.getApprovalCheck())
                        .approvalUpLoadDate(approval.getApprovalUpLoadDate())
                        .approvalSuccessDate(approval.getApprovalSuccessDate())
                        .approvalBackDate(approval.getApprovalBackDate())
                        .build()
                )
                .toList();
    }
    @Transactional(readOnly = true)
    public ApprovalDetailResponse approvalDetail(Long id) {
        Approval entity = getApproval(id);

        return ApprovalDetailResponse.builder()
                .approvalId(entity.getApprovalId())
                .approvalSubject(entity.getApprovalSubject())
                .approvalContent(entity.getApprovalContent())
                .build();
    }
    @Transactional
    public Long approvalInsert(ApprovalInsert request, List<MultipartFile> files) {
        Emp emp = SecurityHelper.getAccount();
        Approval entity = Approval.builder()
                .emp(emp)
                .approvalSubject(request.getApprovalSubject())
                .approvalContent(request.getApprovalContent())
                .approvalCheck("결재요청")
                .approvalCheckMan(request.getApprovalCheckMan())
                .approvalCheckManPosition(request.getApprovalCheckManPosition())
                .approvalUpLoadDate(LocalDate.now())
                .build();
        approvalRepository.save(entity);

        createApprovalFileList(entity, files);

        return entity.getApprovalId();
    }

    @Transactional
    public Long update(Long id, ApprovalUpdate request) {
        Emp emp = SecurityHelper.getAccount();
        Approval entity = getApproval(id);
        entity.update(emp, request);
        approvalRepository.save(entity);
        return entity.getApprovalId();
    }

    @Transactional
    public Long reject(Long id, ApprovalUpdate request) {
        Emp emp = SecurityHelper.getAccount();
        Approval entity = getApproval(id);
        entity.reject(emp, request);
        approvalRepository.save(entity);
        return entity.getApprovalId();
    }

    @Transactional
    public void createApprovalFileList(Approval approval, List<MultipartFile> files) {
        List<ApprovalFile> approvalFileList = new ArrayList<>();

        if (isNullOrEmpty(files)) {
            return;
        } else {
            for (MultipartFile file : files) {
                UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.approval);
                ApprovalFile approvalFile = new ApprovalFile(approval, uploadFile);
                approvalFileList.add(approvalFile);
            }
        }
        approvalFileRepository.saveAll(approvalFileList);
    }

    private Approval getApproval(Long id) {
        return approvalRepository.findByApprovalId(id);
    }
}