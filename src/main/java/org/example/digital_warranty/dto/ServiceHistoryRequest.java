package org.example.digital_warranty.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ServiceHistoryRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Service date is required")
    private LocalDate serviceDate;

    @NotBlank(message = "Service center is required")
    private String serviceCenter;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Cost is required")
    @PositiveOrZero(message = "Cost cannot be negative")
    private BigDecimal cost;

    private String technicianName;

    private String invoiceUrl;

    private String notes;
}