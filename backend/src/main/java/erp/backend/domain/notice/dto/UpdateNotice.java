package erp.backend.domain.notice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateNotice extends NoticeRequest {
    private List<Long> deleteUploadFileIds;
}
