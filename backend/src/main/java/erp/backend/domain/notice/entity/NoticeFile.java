package erp.backend.domain.notice.entity;

import erp.backend.domain.upload.entity.UploadFile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@NoArgsConstructor
@Getter
@Table(name = "noticefile")
public class NoticeFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICEFILE_ID")
    private Long noticeFileId;

    @CreationTimestamp
    @Column(name = "NOTICEFILE_CREATEDDATE")
    private LocalDateTime noticeFileCreatedDate;

    // 외래키
    @ManyToOne
    @JoinColumn(name = "NOTICEFILE_NOTICE_ID")
    private Notice notice;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "NOTICEFILE_UPLOADFILE_ID")
    private UploadFile uploadFile;

    public NoticeFile(Notice notice, UploadFile uploadFile) {
        this.notice = notice;
        this.uploadFile = uploadFile;
    }
}
