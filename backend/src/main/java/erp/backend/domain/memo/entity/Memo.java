package erp.backend.domain.memo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMO_ID")
    private long memoId;

    //외래키
    @Column(name = "MEMO_EMP_ID")
    private long memoEmpId;
    @Column(name = "MEMO_CONTENT")
    private String memoContent;

}