package org.projects.market.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import java.util.Map;
import java.util.HashMap;

@Service
// @RequiredArgsConstructor // (Uncomment this and the javaMailSender field if
// switching back to OLD CODE)
public class EmailService {

    // OLD CODE: SMTP EMAIL (Causes 500 block on Render)
    /*
     * private final JavaMailSender javaMailSender;
     * 
     * public void sendVerificationOtpEmail(String userEmail, String otp, String
     * subject, String text) throws MessagingException {
     * try {
     * MimeMessage mimeMessage = javaMailSender.createMimeMessage();
     * MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,
     * "utf-8");
     * mimeMessageHelper.setSubject(subject);
     * mimeMessageHelper.setText(text);
     * mimeMessageHelper.setTo(userEmail);
     * javaMailSender.send(mimeMessage);
     * } catch(MailException e) {
     * throw new MailSendException("failed to send email");
     * }
     * }
     */
    // NEW CODE: RESEND HTTP API (Render Friendly)

    @org.springframework.beans.factory.annotation.Value("${resend.api.key}")
    private String resendApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text)
            throws MessagingException {
        try {
            String resendApiUrl = "https://api.resend.com/emails";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(resendApiKey);

            Map<String, Object> body = new HashMap<>();
            // Resend requires a verified sending domain. If you haven't verified a domain,
            // you can only use their sandbox domain 'onboarding@resend.dev' and can only
            // send emails to yourself.
            body.put("from", "onboarding@resend.dev");
            body.put("to", new String[] { userEmail });
            body.put("subject", subject);
            body.put("html", "<p>" + text + "</p>");

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            restTemplate.postForEntity(resendApiUrl, request, String.class);

        } catch (Exception e) {
            throw new MailSendException("failed to send email via Resend API: " + e.getMessage());
        }
    }
}
