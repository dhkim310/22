package erp.backend.global.mailsender.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;

public interface MailServiceImpl {
    MimeMessage message(String to) throws MessagingException, UnsupportedEncodingException;

    // 메일 발송
    void sendSimpleMessage(String to) throws Exception;

}
