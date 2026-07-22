package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.WarrantyRequest;
import org.example.digital_warranty.dto.WarrantyResponse;
import org.example.digital_warranty.entity.Product;
import org.example.digital_warranty.entity.Warranty;
import org.example.digital_warranty.exception.ResourceNotFoundException;
import org.example.digital_warranty.exception.UnauthorizedException;
import org.example.digital_warranty.repository.ProductRepository;
import org.example.digital_warranty.repository.WarrantyRepository;
import org.example.digital_warranty.service.WarrantyService;
import org.springframework.stereotype.Service;
import org.example.digital_warranty.service.NotificationService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WarrantyServiceImpl implements WarrantyService {

    private final WarrantyRepository warrantyRepository;
    private final ProductRepository productRepository;
    private final NotificationService notificationService;

    @Override
    public WarrantyResponse addWarranty(WarrantyRequest request,
                                        String email) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getUser().getEmail().equals(email))
            throw new UnauthorizedException("Unauthorized");

        Warranty warranty = Warranty.builder()
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .warrantyType(request.getWarrantyType())
                .provider(request.getProvider())
                .terms(request.getTerms())
                .product(product)
                .build();

        warranty = warrantyRepository.save(warranty);
        notificationService.createNotification(
                product.getUser(),
                "Warranty Added",
                "Warranty has been added for " + product.getProductName() + "."
        );

        return map(warranty);
    }

    @Override
    public WarrantyResponse getWarranty(Long productId,
                                        String email) {

        Product product = productRepository.findById(productId)
                .orElseThrow();

        if (!product.getUser().getEmail().equals(email))
            throw new UnauthorizedException("Unauthorized");

        return map(
                warrantyRepository.findByProductId(productId)
                        .orElseThrow()
        );
    }

    @Override
    public WarrantyResponse updateWarranty(Long productId,
                                           WarrantyRequest request,
                                           String email) {

        Warranty warranty = warrantyRepository.findByProductId(productId)
                .orElseThrow();

        if (!warranty.getProduct().getUser().getEmail().equals(email))
            throw new UnauthorizedException("Unauthorized");

        warranty.setStartDate(request.getStartDate());
        warranty.setEndDate(request.getEndDate());
        warranty.setWarrantyType(request.getWarrantyType());
        warranty.setProvider(request.getProvider());
        warranty.setTerms(request.getTerms());

        Warranty updatedWarranty = warrantyRepository.save(warranty);

        notificationService.createNotification(
                updatedWarranty.getProduct().getUser(),
                "Warranty Updated",
                "Warranty has been updated for " +
                        updatedWarranty.getProduct().getProductName() + "."
        );

        return map(updatedWarranty);
    }

    @Override
    public void deleteWarranty(Long productId,
                               String email) {

        Warranty warranty = warrantyRepository.findByProductId(productId)
                .orElseThrow();

        if (!warranty.getProduct().getUser().getEmail().equals(email))
            throw new UnauthorizedException("Unauthorized");

        notificationService.createNotification(
                warranty.getProduct().getUser(),
                "Warranty Deleted",
                "Warranty has been deleted for " +
                        warranty.getProduct().getProductName() + "."
        );

        warrantyRepository.delete(warranty);
    }

    private WarrantyResponse map(Warranty warranty){

        return WarrantyResponse.builder()
                .id(warranty.getId())
                .productId(warranty.getProduct().getId())
                .productName(warranty.getProduct().getProductName())
                .startDate(warranty.getStartDate())
                .endDate(warranty.getEndDate())
                .warrantyType(warranty.getWarrantyType())
                .provider(warranty.getProvider())
                .terms(warranty.getTerms())
                .build();
    }
    @Override
    public List<WarrantyResponse> getAllWarranties(String email) {

        return warrantyRepository
                .findByProductUserEmail(email)
                .stream()
                .map(this::map)
                .toList();

    }
}