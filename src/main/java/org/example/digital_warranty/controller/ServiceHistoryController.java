package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ServiceHistoryRequest;
import org.example.digital_warranty.dto.ServiceHistoryResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.ServiceHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceHistoryController {

    private final ServiceHistoryService serviceHistoryService;

    // Add Service with Invoice Upload
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ServiceHistoryResponse>> addService(

            @RequestPart("service")
            @Valid ServiceHistoryRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        ServiceHistoryResponse response =
                serviceHistoryService.addService(
                        request,
                        file
                );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<ServiceHistoryResponse>builder()
                                .success(true)
                                .message("Service history added successfully")
                                .data(response)
                                .build()
                );
    }

    // Get Single Service
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceHistoryResponse>> getService(
            @PathVariable Long id) {

        ServiceHistoryResponse response =
                serviceHistoryService.getServiceById(id);

        return ResponseEntity.ok(
                ApiResponse.<ServiceHistoryResponse>builder()
                        .success(true)
                        .message("Service history fetched successfully")
                        .data(response)
                        .build()
        );
    }

    // Get All Services
    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceHistoryResponse>>> getAllServices(
            Authentication authentication) {

        List<ServiceHistoryResponse> response =
                serviceHistoryService.getAllServices(
                        authentication.getName()
                );

        return ResponseEntity.ok(
                ApiResponse.<List<ServiceHistoryResponse>>builder()
                        .success(true)
                        .message("Service history fetched successfully")
                        .data(response)
                        .build()
        );
    }

    // Get Services By Product
    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<ServiceHistoryResponse>>> getServicesByProduct(
            @PathVariable Long productId) {

        List<ServiceHistoryResponse> response =
                serviceHistoryService.getServicesByProduct(productId);

        return ResponseEntity.ok(
                ApiResponse.<List<ServiceHistoryResponse>>builder()
                        .success(true)
                        .message("Service history fetched successfully")
                        .data(response)
                        .build()
        );
    }

    // Update Service with Invoice Upload
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<ServiceHistoryResponse>> updateService(

            @PathVariable Long id,

            @RequestPart("service")
            @Valid ServiceHistoryRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file) {

        ServiceHistoryResponse response =
                serviceHistoryService.updateService(
                        id,
                        request,
                        file
                );

        return ResponseEntity.ok(
                ApiResponse.<ServiceHistoryResponse>builder()
                        .success(true)
                        .message("Service history updated successfully")
                        .data(response)
                        .build()
        );
    }

    // Delete Service
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteService(
            @PathVariable Long id) {

        serviceHistoryService.deleteService(id);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Service history deleted successfully")
                        .data("Deleted")
                        .build()
        );
    }
}