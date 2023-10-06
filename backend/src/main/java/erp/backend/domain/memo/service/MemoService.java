package erp.backend.domain.memo.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.dto.MemoInsert;
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
    public Long createMemo(MemoInsert request) {
        Emp emp = SecurityHelper.getAccount();
        System.out.println("emp: " + emp);
        Memo entity = Memo.builder()
            .emp(emp)
            .memoContent(request.getContent())
            .build();
        return memoRepository.save(entity).getMemoId();
    }

    @Transactional
    public Long updateMemo(Long memoId, MemoUpdate request){
        Emp emp = SecurityHelper.getAccount();
        Memo memo = memoRepository.findByEmpEmpIdOrderByMemoIdDesc(emp.getEmpId());
        memo.update(emp, request);
        return memo.getMemoId();
//        Memo memo = memoRepository.findById(memoId)
//                .orElseThrow(() -> new IllegalArgumentException("메모가 없습니다."));
//
//        memo.update(request.getContent());
//        memoRepository.save(memo);
    }

    @Transactional
    public void deleteMemo(Long memoId){
        Emp emp = SecurityHelper.getAccount();
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new IllegalArgumentException("메모가 없습니다."));

        memoRepository.deleteById(memoId);
    }
}
