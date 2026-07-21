package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ServiceHistoryRequest;
import org.example.digital_warranty.dto.ServiceHistoryResponse;
import org.example.digital_warranty.entity.Product;
import org.example.digital_warranty.entity.ServiceHistory;
import org.example.digital_warranty.entity.User;
import org.example.digital_warranty.exception.ResourceNotFoundException;
import org.example.digital_warranty.repository.ProductRepository;
import org.example.digital_warranty.repository.ServiceHistoryRepository;
import org.example.digital_warranty.service.ServiceHistoryService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceHistoryServiceImpl implements ServiceHistoryService {

    private final ServiceHistoryRepository serviceHistoryRepository;
    private final ProductRepository productRepository;

    @Override
    public ServiceHistoryResponse addService(ServiceHistoryRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        User currentUser = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!product.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Product not found");
        }

        ServiceHistory service = ServiceHistory.builder()
                .serviceDate(request.getServiceDate())
                .serviceCenter(request.getServiceCenter())
                .description(request.getDescription())
                .cost(request.getCost())
                .technicianName(request.getTechnicianName())
                .invoiceUrl(request.getInvoiceUrl())
                .notes(request.getNotes())
                .product(product)
                .build();

        service = serviceHistoryRepository.save(service);

        return mapToResponse(service);
    }

    @Override
    public ServiceHistoryResponse getServiceById(Long id) {

        ServiceHistory service = serviceHistoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service record not found"));

        return mapToResponse(service);
    }

    @Override
    public List<ServiceHistoryResponse> getServicesByProduct(Long productId) {

        return serviceHistoryRepository.findByProductId(productId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ServiceHistoryResponse updateService(Long id,
                                                ServiceHistoryRequest request) {

        ServiceHistory service = serviceHistoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service record not found"));

        service.setServiceDate(request.getServiceDate());
        service.setServiceCenter(request.getServiceCenter());
        service.setDescription(request.getDescription());
        service.setCost(request.getCost());
        service.setTechnicianName(request.getTechnicianName());
        service.setInvoiceUrl(request.getInvoiceUrl());
        service.setNotes(request.getNotes());

        service = serviceHistoryRepository.save(service);

        return mapToResponse(service);
    }

    @Override
    public void deleteService(Long id) {

        ServiceHistory service = serviceHistoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service record not found"));

        serviceHistoryRepository.delete(service);
    }

    private ServiceHistoryResponse mapToResponse(ServiceHistory service) {

        return ServiceHistoryResponse.builder()
                .id(service.getId())
                .productId(service.getProduct().getId())
                .productName(service.getProduct().getProductName())
                .serviceDate(service.getServiceDate())
                .serviceCenter(service.getServiceCenter())
                .description(service.getDescription())
                .cost(service.getCost())
                .technicianName(service.getTechnicianName())
                .invoiceUrl(service.getInvoiceUrl())
                .notes(service.getNotes())
                .build();
    }
}