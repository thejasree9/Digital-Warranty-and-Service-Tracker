package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.ServiceHistoryRequest;
import org.example.digital_warranty.dto.ServiceHistoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ServiceHistoryService {

    ServiceHistoryResponse addService(
            ServiceHistoryRequest request,
            MultipartFile file
    );

    ServiceHistoryResponse getServiceById(Long id);

    List<ServiceHistoryResponse> getServicesByProduct(Long productId);

    ServiceHistoryResponse updateService(
            Long id,
            ServiceHistoryRequest request,
            MultipartFile file
    );

    void deleteService(Long id);

    List<ServiceHistoryResponse> getAllServices(String email);
}