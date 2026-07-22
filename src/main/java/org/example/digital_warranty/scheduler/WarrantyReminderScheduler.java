package org.example.digital_warranty.scheduler;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.entity.Warranty;
import org.example.digital_warranty.repository.WarrantyRepository;
import org.example.digital_warranty.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.example.digital_warranty.service.NotificationService;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class WarrantyReminderScheduler {

    private final WarrantyRepository warrantyRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 9 * * *")
    public void sendWarrantyReminders() {

        LocalDate today = LocalDate.now();
        LocalDate nextWeek = today.plusDays(7);

        System.out.println("Today: " + today);
        System.out.println("Searching until: " + nextWeek);

        List<Warranty> warranties =
                warrantyRepository.findByEndDateBetweenAndReminderSentFalse(today, nextWeek);

        System.out.println("Found warranties: " + warranties.size());
        for (Warranty warranty : warranties) {

            System.out.println("Sending to: " +
                    warranty.getProduct().getUser().getEmail());

            emailService.sendWarrantyReminder(
                    warranty.getProduct().getUser().getEmail(),
                    warranty.getProduct().getProductName(),
                    warranty.getEndDate().toString()
            );

            notificationService.createNotification(
                    warranty.getProduct().getUser(),
                    "Warranty Expiry Reminder",
                    "Your warranty for \"" +
                            warranty.getProduct().getProductName() +
                            "\" will expire on " +
                            warranty.getEndDate() +
                            ". Please renew or extend it if applicable."
            );

            warranty.setReminderSent(true);
            warrantyRepository.save(warranty);
        }

        System.out.println("Warranty reminder scheduler executed.");
    }
}