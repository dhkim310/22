package erp.backend.domain.message.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import erp.backend.domain.message.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static erp.backend.domain.message.entity.QMessage.message;

@Repository
@RequiredArgsConstructor
public class MessageQueryDsl {
    private final JPAQueryFactory jpaQueryFactory;

    public List<Message> messageList(Long empId) {
        return jpaQueryFactory
                .selectFrom(message)
                .where(message.messageReceiverEmpId.eq(empId))
                .orderBy(message.messageId.desc())
                .fetch();
    }
}