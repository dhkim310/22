package erp.backend.domain.notice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICE_ID")
    private long noticeId;
    //외래키
    @ManyToOne(fetch = FetchType.LAZY) // 필요할때만 호출
    @JoinColumn(name = "NOTICE_EMP_ID", referencedColumnName = "EMP_ID", updatable = false) // 작성자만 수정 가능
    private Emp emp;

    @Column(name = "NOTICE_SUBJECT")
    private String noticeSubject;

    @Column(name = "NOTICE_CONTENT")
    private String noticeContent;

    @Column(name = "NOTICE_VIEWS")
    private int noticeViews;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "NOTICE_CREATEDDATE")
    private LocalDateTime noticeCreatedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss", timezone = "Asia/Seoul")
    @CreationTimestamp
    @Column(name = "NOTICE_MODIFIEDDATE")
    private LocalDateTime noticeModifiedDate;

    public Notice updateViewCount(int noticeViews){
        this.noticeViews = getNoticeViews()+1;
        return this;
    }
}
