package erp.backend.domain.message.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageListResponse {

    private long messageId;
    private long messageSenderEmpId;
    private String messageSenderName;
    private String messageSubject;
    private String messageStatus;
    private LocalDateTime messageSendTime;
}
