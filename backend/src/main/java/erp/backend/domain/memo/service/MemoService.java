package erp.backend.domain.memo.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.dto.MemoResponse;
import erp.backend.domain.memo.dto.MemoUpdate;
import erp.backend.domain.memo.entity.Memo;
import erp.backend.domain.memo.repository.MemoRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemoService {
    private final MemoRepository memoRepository;

    @Transactional
    public Long memoUpdate(MemoUpdate request) {
        Emp emp = SecurityHelper.getAccount();

        Memo entity = memoRepository.findByEmp_EmpId(emp.getEmpId());
        entity.update(request);
        return entity.getMemoId();
    }

    @Transactional(readOnly = true)
    public MemoResponse memoResponse() {
        Emp emp = SecurityHelper.getAccount();

        Memo entity = memoRepository.findByEmp_EmpId(emp.getEmpId());
        return MemoResponse.builder()
                .memoContent(entity.getMemoContent())
                .build();
    }
}