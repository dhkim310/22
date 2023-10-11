package erp.backend.domain.memo.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.dto.MemoInsert;
import erp.backend.domain.memo.dto.MemoResponse;
import erp.backend.domain.memo.dto.MemoUpdate;
import erp.backend.domain.memo.entity.Memo;
import erp.backend.domain.memo.repository.MemoRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Long memoInsert(MemoInsert request) {
        Emp emp = SecurityHelper.getAccount();
        Memo entity = Memo.builder()
            .emp(emp)
            .memoContent(request.getContent())
            .build();
        return memoRepository.save(entity).getMemoId();
    }

    @Transactional
    public Long memoUpdate(MemoUpdate request){
        Emp emp = SecurityHelper.getAccount();
        Memo memo = memoRepository.findTopByEmpEmpIdOrderByMemoIdDesc(emp.getEmpId());
        memo.update(emp, request);
        return memo.getMemoId();
    }

    @Transactional(readOnly = true)
    public MemoResponse memoResponse() {
        Emp emp = SecurityHelper.getAccount();
        Optional<Memo> entity = Optional.ofNullable(memoRepository.findTopByEmpEmpIdOrderByMemoIdDesc(emp.getEmpId()));
        return MemoResponse.builder()
                .memoContent(entity.map(e -> e.getMemoContent()).orElse(""))
                .build();
    }
}
