package erp.backend.domain.noticefile.dto;

import erp.backend.domain.noticefile.entity.NoticeFile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeFileFormat {
    private String noticeFileName;
    private String noticeFileExtension;
    private String noticeFilePath;

    public NoticeFileFormat(NoticeFile noticeFile) {
        this.noticeFileName = noticeFile.getNoticeFileName();
        this.noticeFileExtension = noticeFile.getNoticeFileExtension();
        this.noticeFilePath = noticeFile.getNoticeFilePath();
    }
}
