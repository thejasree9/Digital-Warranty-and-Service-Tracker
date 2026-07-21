package org.example.digital_warranty.repository;

import org.example.digital_warranty.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {


    List<Product> findByProductNameContainingIgnoreCase(String productName);

    List<Product> findByBrandContainingIgnoreCase(String brand);
    List<Product> findByUserId(Long userId);
    long countByUserId(Long userId);
    Page<Product> findByUserEmail(
            String email,
            Pageable pageable
    );

}