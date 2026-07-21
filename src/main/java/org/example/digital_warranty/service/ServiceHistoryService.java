package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.ServiceHistoryRequest;
import org.example.digital_warranty.dto.ServiceHistoryResponse;

import java.util.List;

public interface ServiceHistoryService {

    ServiceHistoryResponse addService(ServiceHistoryRequest request);

    ServiceHistoryResponse getServiceById(Long id);

    List<ServiceHistoryResponse> getServicesByProduct(Long productId);

    ServiceHistoryResponse updateService(Long id, ServiceHistoryRequest request);

    void deleteService(Long id);
}