package org.example.digital_warranty.service;

public interface EmailService {

    void sendWarrantyReminder(
            String to,
            String productName,
            String expiryDate
    );
}