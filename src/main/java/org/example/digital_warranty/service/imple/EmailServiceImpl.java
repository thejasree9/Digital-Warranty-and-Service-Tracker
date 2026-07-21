package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.service.EmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendWarrantyReminder(
            String to,
            String productName,
            String expiryDate) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject("Warranty Expiry Reminder");

        message.setText(
                "Hello,\n\n"
                        + "Your warranty for "
                        + productName
                        + " is going to expire on "
                        + expiryDate
                        + ".\n\n"
                        + "Please renew your warranty if required.\n\n"
                        + "Thank you,\n"
                        + "Digital Warranty Tracker"
        );

        try {
            mailSender.send(message);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            System.out.println("Email sending failed!");
            e.printStackTrace();
        }
    }
}