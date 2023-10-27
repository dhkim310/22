package erp.backend.domain.message.service;

import erp.backend.domain.emp.entity.Emp;
import erp.backend.domain.message.dto.*;
import erp.backend.domain.message.entity.Message;
import erp.backend.domain.message.repository.MessageRepository;
import erp.backend.global.config.security.SecurityHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessageEmitterService messageEmitterService;

    public Long messageInsert(MessageRequest request) {
        //Transactional 뺌 알람은 못 받아도 메시지는 전송되어야 하니
        //401 에러가 떠도 메시지는 db에 등록됨.
        Emp emp = SecurityHelper.getAccount();
        Message entity = Message.builder()
                .messageSenderEmpId(emp)
                .messageContent(request.getMessageContent())
                .messageSubject(request.getMessageSubject())
                .messageStatus(request.getMessageStatus())
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
        List<Message> list = messageRepository.findByMessageReceiverEmpId(emp.getEmpId());

        return list.stream()
                .map(message -> MessageListResponse.builder()
                        .messageId(message.getMessageId())
                        .messageSenderEmpId(message.getMessageSenderEmpId().getEmpId())
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
