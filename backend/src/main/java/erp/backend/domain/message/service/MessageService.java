package erp.backend.domain.message.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.message.dto.MessageDetailResponse;
import erp.backend.domain.message.dto.MessageListResponse;
import erp.backend.domain.message.dto.MessageRequest;
import erp.backend.domain.message.entity.Message;
import erp.backend.domain.message.repository.MessageQueryDsl;
import erp.backend.domain.message.repository.MessageRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessageEmitterService messageEmitterService;

    private final MessageQueryDsl messageQueryDsl;

    public Long messageInsert(MessageRequest request) {
        //TODO: Transactional 뺌 알람은 못 받아도 메시지는 전송되어야 하니
        //401 에러가 떠도 메시지는 db에 등록됨.
        Emp emp = SecurityHelper.getAccount();
        Message entity = Message.builder()
                .messageSenderEmpId(emp)
                .messageSendTime(LocalDateTime.now())
                .messageContent(request.getMessageContent())
                .messageSubject(request.getMessageSubject())
                .messageStatus("unread")
                .messageReceiverEmpId(request.getMessageReceiverEmpId())
                .build();

        Message savedEntity = messageRepository.save(entity);
        Long messageId = savedEntity.getMessageReceiverEmpId();

        messageEmitterService.sendMessageUpdate(messageId, savedEntity);
        return messageId;
    }

    @Transactional(readOnly = true)
    public List<MessageListResponse> searchList() {
        Emp emp = SecurityHelper.getAccount();
        List<Message> list = messageQueryDsl.messageList(emp.getEmpId());

        return list.stream()
                .map(message -> MessageListResponse.builder()
                        .messageId(message.getMessageId())
                        .messageSenderName(message.getMessageSenderEmpId().getEmpName())
                        .messageSenderEmpId(message.getMessageSenderEmpId().getEmpId())
                        .messageSendTime(message.getMessageSendTime())
                        .messageSubject(message.getMessageSubject())
                        .messageStatus(message.getMessageStatus())
                        .build()
                )
                .toList();
    }

    @Transactional(readOnly = true)
    public MessageDetailResponse detailMessage(Long id) {
        Emp emp = SecurityHelper.getAccount();
        Message entity = getMessage(id);

        return MessageDetailResponse.builder()
                .messageSender(entity.getMessageSenderEmpId().getEmpName())
                .messageContent(entity.getMessageContent())
                .messageSubject(entity.getMessageSubject())
                .messageSendTime(entity.getMessageSendTime())
                .build();
    }

    @Transactional
    public void update(Long id) {
        Message entity = getMessage(id);
        entity.update();
    }

    private Message getMessage(Long id) {
        return messageRepository.findByMessageId(id);
    }
}