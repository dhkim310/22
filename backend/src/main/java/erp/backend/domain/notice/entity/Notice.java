package erp.backend.domain.notice.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.notice.dto.NoticeListResponse;
import erp.backend.domain.notice.dto.NoticeRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER) // 필요할때만 호출
    @JoinColumn(name = "NOTICE_EMP_ID", referencedColumnName = "EMP_ID", updatable = false) // 작성자 수정 불가
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
    @Column(name = "NOTICE_MODIFIEDDATE")
    private LocalDateTime noticeModifiedDate;

    @JsonIgnore
    @OneToMany(
            mappedBy = "notice",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<NoticeFile> noticeFileList = new ArrayList<>();

    public void updateViewCount() {
        this.noticeViews += 1;
    }

    public void update(NoticeRequest request) {
        this.noticeSubject = request.getSubject();
        this.noticeContent = request.getContent();
        this.noticeModifiedDate = LocalDateTime.now();
    }

}
