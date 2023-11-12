package erp.backend.domain.message.entity;

import erp.backend.domain.emp.entity.Emp;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID")
    private long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MESSAGE_SENDER_EMP_ID")
    private Emp messageSenderEmpId;

    @Column(name = "MESSAGE_RECEIVER_EMP_ID")
    private long messageReceiverEmpId;

    @Column(name = "MESSAGE_SENDTIME")
    private LocalDateTime messageSendTime;

    @Column(name = "MESSAGE_CONTENT")
    private String messageContent;

    @Column(name = "MESSAGE_SUBJECT")
    private String messageSubject;

    @Column(name = "MESSAGE_STATUS")
    private String messageStatus;

    public void update() {
        this.messageStatus = "read";
    }

}