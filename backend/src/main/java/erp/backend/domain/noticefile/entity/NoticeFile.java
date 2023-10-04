package erp.backend.domain.noticefile.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //jpa 사용할때!
@AllArgsConstructor // 파라미터있는생성자
@NoArgsConstructor // 기본생성자
@Data // setter, getter 자동생성
public class NoticeFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTICEFILE_ID")
    private long noticeFileId;
    // 외래키
    @Column(name = "NOTICEFILE_NOTICE_ID")
    private long noticeFileNoticeId;

    @Column(name = "NOTICEFILE_NAME")
    private String noticeFileName;

    @Column(name = "NOTICEFILE_ORIGINNAME")
    private String noticeFileOriginName;

    @Column(name = "NOTICEFILE_PATH")
    private String noticeFilePath;
}
