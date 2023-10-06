package erp.backend.domain.noticefile.entity;

import erp.backend.domain.notice.entity.Notice;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Entity //jpa 사용할때!
@NoArgsConstructor
@Getter
public class NoticeFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICEFILE_ID")
    private long noticeFileId;
    // 외래키
    @ManyToOne
    @JoinColumn(name = "NOTICEFILE_NOTICE_ID", referencedColumnName = "NOTICE_ID", nullable = false)
    private Notice notice;

    @Column(name = "NOTICEFILE_NAME")
    private String noticeFileName;

    @Column(name = "NOTICEFILE_PATH")
    private String noticeFilePath;

    @Column(name = "NOTICEFILE_EXTENSION")
    private String noticeFileExtension;

    public NoticeFile(MultipartFile multipartFile, Notice notice) {

        this.noticeFileName = multipartFile.getOriginalFilename();
        this.noticeFilePath = "http://localhost:8080/api/notice/files" + notice.getNoticeId() + "_" + this.noticeFileName;
        this.noticeFileExtension = this.noticeFileName.substring(this.noticeFileName.lastIndexOf(".") + 1);
        this.notice = notice;

    }
}
