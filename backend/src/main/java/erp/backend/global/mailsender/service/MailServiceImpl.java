package erp.backend.global.mailsender.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

public interface MailServiceImpl {
    MimeMessage message(String to) throws MessagingException, UnsupportedEncodingException;

    // 메일 발송
    String sendSimpleMessage(String to) throws Exception;

}
