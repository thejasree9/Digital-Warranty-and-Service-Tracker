package org.example.digital_warranty.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WarrantyRequest {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotBlank(message = "Warranty type is required")
    private String warrantyType;

    @NotBlank(message = "Provider is required")
    private String provider;

    private String terms;

    // Warranty card file path / URL
    private String warrantyCardUrl;
}