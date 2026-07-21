package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.DashboardResponse;
import org.example.digital_warranty.entity.User;
import org.example.digital_warranty.repository.ProductRepository;
import org.example.digital_warranty.repository.ServiceHistoryRepository;
import org.example.digital_warranty.repository.WarrantyRepository;
import org.example.digital_warranty.service.DashboardService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    private final WarrantyRepository warrantyRepository;
    private final ServiceHistoryRepository serviceHistoryRepository;

    @Override
    public DashboardResponse getDashboard() {

        User currentUser = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Long userId = currentUser.getId();

        LocalDate today = LocalDate.now();

        long totalProducts = productRepository.countByUserId(userId);

        long activeWarranties =
                warrantyRepository.countByProductUserIdAndEndDateGreaterThanEqual(
                        userId, today);

        long expiredWarranties =
                warrantyRepository.countByProductUserIdAndEndDateLessThan(
                        userId, today);

        long expiringSoon =
                warrantyRepository.countByProductUserIdAndEndDateBetween(
                        userId,
                        today,
                        today.plusDays(30));

        long totalServices =
                serviceHistoryRepository.countByProductUserId(userId);

        BigDecimal totalMaintenanceCost =
                serviceHistoryRepository.getTotalMaintenanceCost(userId);

        return DashboardResponse.builder()
                .totalProducts(totalProducts)
                .activeWarranties(activeWarranties)
                .expiredWarranties(expiredWarranties)
                .expiringSoon(expiringSoon)
                .totalServices(totalServices)
                .totalMaintenanceCost(totalMaintenanceCost)
                .build();
    }
}