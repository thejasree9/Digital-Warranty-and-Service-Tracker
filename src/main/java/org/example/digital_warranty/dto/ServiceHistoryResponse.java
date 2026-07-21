package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class ServiceHistoryResponse {

    private Long id;

    private Long productId;

    private String productName;

    private LocalDate serviceDate;

    private String serviceCenter;

    private String description;

    private BigDecimal cost;

    private String technicianName;

    private String invoiceUrl;

    private String notes;
}