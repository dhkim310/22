package erp.backend.domain.message.dto;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDetailResponse {
    private String messageSender;
    private String messageContent;
    private String messageSubject;
}
