package erp.backend.domain.message.dto;

import erp.backend.domain.emp.entity.Emp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequest {
    private long messageSenderEmpId;
    private long messageReceiverEmpId;
    private String messageContent;
    private String messageSubject;
}
