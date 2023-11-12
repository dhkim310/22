package erp.backend.domain.memo.entity;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.memo.dto.MemoUpdate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMO_ID")
    private long memoId;

    @ManyToOne(fetch = FetchType.LAZY) // 필요할때만 호출
    @JoinColumn(name = "MEMO_EMP_ID", referencedColumnName = "EMP_ID")
    private Emp emp;

    @Column(name = "MEMO_CONTENT")
    private String memoContent;

    public void update(MemoUpdate request) {
        this.memoContent = request.getContent();
    }
}