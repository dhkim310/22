package erp.backend.global.mailsender.service;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
@RequiredArgsConstructor
@Service
public class MailService implements MailServiceImpl{

    private final JavaMailSender emailSender;

    @Override
    public MimeMessage message(String to) throws MessagingException, UnsupportedEncodingException {

        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject("(주) 엄용민 프로덕션 : 알림");

        String msgg = "";
        msgg += "비밀번호가 변경되었습니다. 본인이 아니라면 담당자에게 연락 바람";
        message.setText(msgg, "utf-8", "html");

        message.setFrom(new InternetAddress("umanmyeong@naver.com", "엄용민 프로덕션"));

        return message;
    }
    @Override
    public String sendSimpleMessage(String to) throws Exception {

        MimeMessage message = message(to); // "to" 로 메일 발송

        try { // 예외처리
            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException();
        }

        return to;
    }
}
