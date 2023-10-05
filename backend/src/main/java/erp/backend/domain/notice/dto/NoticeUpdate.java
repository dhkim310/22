package erp.backend.domain.notice.dto;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class NoticeUpdate {
    private String subject;
    private String content;
}
