package erp.backend.domain.notice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import erp.backend.domain.uploadfile.entity.UploadFile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@NoArgsConstructor
@Getter
@Table(name = "noticefile")
public class NoticeFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICEFILE_ID")
    private Long noticeFileId;

    // 외래키
    @ManyToOne
    @JoinColumn(name = "NOTICEFILE_NOTICE_ID")
    @JsonIgnore
    private Notice notice;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "NOTICEFILE_UPLOADFILE_ID")
    @JsonIgnore
    private UploadFile uploadFile;

    public NoticeFile(Notice notice, UploadFile uploadFile) {
        this.notice = notice;
        this.uploadFile = uploadFile;
    }
}
