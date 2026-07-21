package org.example.digital_warranty.repository;

import org.example.digital_warranty.entity.ServiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;

public interface ServiceHistoryRepository extends JpaRepository<ServiceHistory, Long> {

    List<ServiceHistory> findByProductId(Long productId);
    long countByProductUserId(Long userId);

    @Query("""
       SELECT COALESCE(SUM(s.cost),0)
       FROM ServiceHistory s
       WHERE s.product.user.id = :userId
       """)
    BigDecimal getTotalMaintenanceCost(Long userId);

}