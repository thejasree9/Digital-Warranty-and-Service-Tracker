package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ServiceHistoryRequest;
import org.example.digital_warranty.dto.ServiceHistoryResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.ServiceHistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceHistoryController {

    private final ServiceHistoryService serviceHistoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceHistoryResponse>> addService(
            @Valid @RequestBody ServiceHistoryRequest request) {

        ServiceHistoryResponse response =
                serviceHistoryService.addService(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<ServiceHistoryResponse>builder()
                                .success(true)
                                .message("Service history added successfully")
                                .data(response)
                                .build()
                );
    }

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

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceHistoryResponse>> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceHistoryRequest request) {

        ServiceHistoryResponse response =
                serviceHistoryService.updateService(id, request);

        return ResponseEntity.ok(
                ApiResponse.<ServiceHistoryResponse>builder()
                        .success(true)
                        .message("Service history updated successfully")
                        .data(response)
                        .build()
        );
    }

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