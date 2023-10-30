package erp.backend.domain.message.service;

import erp.backend.domain.message.entity.Message;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MessageEmitterService {
    private static final Long TIMEOUT = 60L * 1000 * 60;
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    public void sendMessageUpdate(Long messageId, Message message) {
        SseEmitter emitter = emitters.get(messageId);
        if (emitter != null) {
            try {
                emitter.send(message, MediaType.APPLICATION_JSON);
                emitter.complete();
                emitters.remove(messageId);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public SseEmitter subscribeToMessage(Long messageId) {
        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitters.put(messageId, emitter);
        return emitter;
    }
}