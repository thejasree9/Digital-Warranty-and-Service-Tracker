package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Data
@Builder
public class ProductResponse {

    private Long id;

    private String productName;

    private String brand;

    private String model;

    private String serialNumber;

    private LocalDate purchaseDate;

    private BigDecimal price;

    private String invoiceUrl;
    private LocalDateTime createdAt;
}