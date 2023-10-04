package erp.backend.domain.memo.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.dto.MemoInsert;
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
    public void updateMemo(Long memoId, MemoInsert request){
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new IllegalArgumentException("메모가 없습니다."));

        memo.setMemoContent(request.getContent());
        memoRepository.save(memo);
    }
}
