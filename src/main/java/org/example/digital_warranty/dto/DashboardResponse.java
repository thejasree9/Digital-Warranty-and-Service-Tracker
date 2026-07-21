package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class DashboardResponse {

    private long totalProducts;

    private long activeWarranties;

    private long expiredWarranties;

    private long expiringSoon;

    private long totalServices;

    private BigDecimal totalMaintenanceCost;
}