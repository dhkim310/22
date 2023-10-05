package erp.backend.domain.memo.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.*;

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

    //외래키
    @ManyToOne(fetch = FetchType.LAZY) // 필요할때만 호출
    @JoinColumn(name = "MEMO_EMP_ID", referencedColumnName = "EMP_ID")
    private Emp emp;
    @Column(name = "MEMO_CONTENT")
    private String memoContent;

    public void setMemoContent(String memoContent) {
        this.memoContent = memoContent;
    }
}