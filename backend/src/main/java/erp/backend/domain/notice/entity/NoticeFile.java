package erp.backend.domain.notice.entity;

import erp.backend.domain.upload.entity.UploadFile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity //jpa 사용할때!
@NoArgsConstructor
@Getter
public class NoticeFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdDate;

    // 외래키
    @ManyToOne
    @JoinColumn(name = "notice_id")
    private Notice notice;

    @OneToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "upload_file_id")
    private UploadFile uploadFile;

    public NoticeFile(Notice notice, UploadFile uploadFile) {
        this.notice = notice;
        this.uploadFile = uploadFile;
    }
}
