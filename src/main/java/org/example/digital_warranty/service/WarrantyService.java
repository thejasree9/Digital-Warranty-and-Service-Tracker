package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.WarrantyRequest;
import org.example.digital_warranty.dto.WarrantyResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface WarrantyService {

    WarrantyResponse addWarranty(
            WarrantyRequest request,
            MultipartFile file,
            String email
    );

    WarrantyResponse getWarranty(
            Long productId,
            String email
    );

    WarrantyResponse updateWarranty(
            Long productId,
            WarrantyRequest request,
            MultipartFile file,
            String email
    );

    void deleteWarranty(
            Long productId,
            String email
    );

    List<WarrantyResponse> getAllWarranties(
            String email
    );

}