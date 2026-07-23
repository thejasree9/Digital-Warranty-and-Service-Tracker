package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class WarrantyResponse {

    private Long id;

    private Long productId;

    private String productName;

    private LocalDate startDate;

    private LocalDate endDate;

    private String warrantyType;

    private String provider;

    private String terms;

    // Warranty Card URL
    private String warrantyCardUrl;

}