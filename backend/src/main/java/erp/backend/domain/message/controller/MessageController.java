package erp.backend.domain.message.controller;

import erp.backend.domain.message.dto.MessageDetailResponse;
import erp.backend.domain.message.dto.MessageListResponse;
import erp.backend.domain.message.dto.MessageRequest;
import erp.backend.domain.message.service.MessageEmitterService;
import erp.backend.domain.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;
    private final MessageEmitterService messageEmitterService;
    @GetMapping("/{id}")
    public ResponseEntity<MessageDetailResponse> messageDetail(@PathVariable("id") Long id) {
        messageService.update(id);
        return ResponseEntity.ok(messageService.detailMessage(id));
    }
    @PostMapping
    public ResponseEntity<Long> messageInsert(@RequestBody MessageRequest request) {
        return ResponseEntity.ok(messageService.messageInsert(request));
    }
    @GetMapping("test/{messageId}")
    public SseEmitter subscribeToMessage(@PathVariable("messageId") Long messageId) {
        return messageEmitterService.subscribeToMessage(messageId);
    }
    @GetMapping
    public ResponseEntity<List<MessageListResponse>> searchList() {
        return ResponseEntity.ok(messageService.searchList());
    }
}
