package erp.backend.domain.approval.service;

import erp.backend.domain.approval.dto.*;
import erp.backend.domain.approval.entity.Approval;
import erp.backend.domain.approval.entity.ApprovalFile;
import erp.backend.domain.approval.repository.ApprovalFileRepository;
import erp.backend.domain.approval.repository.ApprovalQueryDsl;
import erp.backend.domain.approval.repository.ApprovalRepository;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.emp.repository.EmpRepository;
import erp.backend.domain.uploadfile.entity.UploadFile;
import erp.backend.domain.uploadfile.service.UploadFileService;
import erp.backend.global.config.security.SecurityHelper;
import erp.backend.global.util.SchemaType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
    private final EmpRepository empRepository;

    private final ApprovalQueryDsl approvalQueryDsl;

    @Transactional(readOnly = true)//결재 대기 및 반려 리스트
    public ApprovalListResult approvalListResult(Pageable pageable) {
        List<Approval> approvalList = approvalQueryDsl.approvalList();

        List<ApprovalListResponse> approvalListResponses = approvalList
                .stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .map(approval -> ApprovalListResponse.builder()
                        .approvalId(approval.getApprovalId())
                        .approvalDrafter(approval.getEmp().getEmpName())
                        .approvalSubject(approval.getApprovalSubject())
                        .approvalCheckMan(approval.getApprovalCheckMan())
                        .approvalCheck(approval.getApprovalCheck())
                        .approvalUpLoadDate(approval.getApprovalUpLoadDate())
                        .approvalBackDate(approval.getApprovalBackDate())
                        .approvalSuccessDate(approval.getApprovalSuccessDate())
                        .build())
                .toList();

        return new ApprovalListResult(pageable.getPageNumber()
                , approvalList.size()
                , pageable.getPageSize()
                , new PageImpl<>(approvalListResponses, pageable, approvalList.size()));
    }

    @Transactional(readOnly = true)//결재 완료 리스트
    public ApprovalListResult approvalSuccessListResult(Pageable pageable) {
        List<Approval> approvalList = approvalQueryDsl.approvalList("결재완료");

        List<ApprovalListResponse> approvalListResponses = approvalList
                .stream()
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .map(approval -> ApprovalListResponse.builder()
                        .approvalId(approval.getApprovalId())
                        .approvalDrafter(approval.getEmp().getEmpName())
                        .approvalSubject(approval.getApprovalSubject())
                        .approvalCheckMan(approval.getApprovalCheckMan())
                        .approvalCheck(approval.getApprovalCheck())
                        .approvalUpLoadDate(approval.getApprovalUpLoadDate())
                        .approvalBackDate(approval.getApprovalBackDate())
                        .approvalSuccessDate(approval.getApprovalSuccessDate())
                        .build())
                .toList();

        return new ApprovalListResult(pageable.getPageNumber()
                , approvalList.size()
                , pageable.getPageSize()
                , new PageImpl<>(approvalListResponses, pageable, approvalList.size()));
    }

    @Transactional(readOnly = true)
    public ApprovalDetailResponse approvalDetail(Long id) {
        Approval entity = getApproval(id);
        List<ApprovalFile> approvalFiles = entity.getApprovalFileList();
        List<UploadFile> uploadFileList = null;
        if (!approvalFiles.isEmpty()) {
            uploadFileList = uploadFileService.fileList(id, SchemaType.approval);
        }

        return ApprovalDetailResponse.builder()
                .approvalId(entity.getApprovalId())
                .approvalDrafter(entity.getEmp().getEmpName())
                .approvalSubject(entity.getApprovalSubject())
                .approvalContent(entity.getApprovalContent())
                .approvalCheckMan(entity.getApprovalCheckMan())
                .approvalUpLoadDate(entity.getApprovalUpLoadDate())
                .approvalFileList(uploadFileList)
                .build();
    }

    @Transactional
    public Long approvalInsert(ApprovalInsert request, List<MultipartFile> files) {
        Emp emp = SecurityHelper.getAccount();
        Emp checkMan = empRepository.findByEmpId(request.getApprovalCheckManId());
        Approval entity = Approval.builder()
                .emp(emp)
                .approvalSubject(request.getApprovalSubject())
                .approvalContent(request.getApprovalContent())
                .approvalCheck("결재요청")
                .approvalCheckMan(checkMan.getEmpName())
                .approvalCheckManPosition(checkMan.getEmpPosition())
                .approvalUpLoadDate(LocalDate.now())
                .build();
        approvalRepository.save(entity);

        createApprovalFileList(entity, files);

        return entity.getApprovalId();
    }

    @Transactional
    public Long update(Long id, ApprovalUpdate request) {
        Emp emp = SecurityHelper.getAccount();
        Approval entity = getApproval(id, emp);
        entity.update(request);
        return entity.getApprovalId();
    }

    @Transactional
    public List<ApprovalFile> createApprovalFileList(Approval approval, List<MultipartFile> files) {
        List<ApprovalFile> approvalFileList = new ArrayList<>();

        if (isNullOrEmpty(files)) {
            return approvalFileList;
        } else {
            for (MultipartFile file : files) {
                UploadFile uploadFile = uploadFileService.createUploadFile(file, SchemaType.approval);
                ApprovalFile approvalFile = new ApprovalFile(approval, uploadFile);
                approvalFileList.add(approvalFile);
            }
        }
        return approvalFileRepository.saveAll(approvalFileList);
    }

    @Transactional(readOnly = true)
    public Long approvalCount() {
        Emp emp = SecurityHelper.getAccount();
        return approvalQueryDsl.countByApprovalCheck(emp.getEmpName());
    }

    private Approval getApproval(Long id) {
        return approvalRepository.findByApprovalId(id);
    }

    private Approval getApproval(Long id, Emp emp) {
        Approval entity = approvalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 데이터 입니다"));
        if (entity.getApprovalCheckMan().equals(emp.getEmpName())) {
            return entity;
        } else {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
    }
}