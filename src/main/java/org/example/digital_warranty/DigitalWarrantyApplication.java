package org.example.digital_warranty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DigitalWarrantyApplication {
    public static void main(String[] args) {
        SpringApplication.run(DigitalWarrantyApplication.class, args);
    }
}