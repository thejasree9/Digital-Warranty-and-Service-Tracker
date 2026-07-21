package org.example.digital_warranty.repository;

import org.example.digital_warranty.entity.Warranty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.time.LocalDate;
import java.util.List;
public interface WarrantyRepository extends JpaRepository<Warranty,Long> {

    Optional<Warranty> findByProductId(Long productId);
    long countByProductUserIdAndEndDateGreaterThanEqual(
            Long userId,
            LocalDate today);

    long countByProductUserIdAndEndDateLessThan(
            Long userId,
            LocalDate today);

    long countByProductUserIdAndEndDateBetween(
            Long userId,
            LocalDate start,
            LocalDate end);
    List<Warranty> findByEndDateBetweenAndReminderSentFalse(
            LocalDate start,
            LocalDate end
    );

}