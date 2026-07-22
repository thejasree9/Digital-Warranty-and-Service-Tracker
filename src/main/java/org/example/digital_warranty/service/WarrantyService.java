package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.WarrantyRequest;
import org.example.digital_warranty.dto.WarrantyResponse;

import java.util.List;

public interface WarrantyService {

    WarrantyResponse addWarranty(WarrantyRequest request,String email);

    WarrantyResponse getWarranty(Long productId,String email);

    WarrantyResponse updateWarranty(Long productId,
                                    WarrantyRequest request,
                                    String email);

    void deleteWarranty(Long productId,String email);
    List<WarrantyResponse> getAllWarranties(String email);
}