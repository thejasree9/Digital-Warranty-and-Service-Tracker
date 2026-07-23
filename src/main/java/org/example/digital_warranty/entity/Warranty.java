package org.example.digital_warranty.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "warranties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate;

    private LocalDate endDate;

    private String warrantyType;

    private String provider;

    @Column(length = 1000)
    private String terms;

    // Warranty Card (PDF/Image URL)
    private String warrantyCardUrl;

    @Column(nullable = false)
    @Builder.Default
    private boolean reminderSent = false;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

}