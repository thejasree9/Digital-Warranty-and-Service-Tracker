package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.WarrantyRequest;
import org.example.digital_warranty.dto.WarrantyResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.WarrantyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/warranty")
@RequiredArgsConstructor
public class WarrantyController {

    private final WarrantyService warrantyService;

    @PostMapping
    public ResponseEntity<ApiResponse<WarrantyResponse>> add(
            @Valid @RequestBody WarrantyRequest request,
            Authentication authentication) {

        WarrantyResponse response = warrantyService.addWarranty(
                request,
                authentication.getName()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<WarrantyResponse>builder()
                                .success(true)
                                .message("Warranty added successfully")
                                .data(response)
                                .build()
                );
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<WarrantyResponse>> get(
            @PathVariable Long productId,
            Authentication authentication) {

        WarrantyResponse response = warrantyService.getWarranty(
                productId,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<WarrantyResponse>builder()
                        .success(true)
                        .message("Warranty fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ApiResponse<WarrantyResponse>> update(
            @PathVariable Long productId,
            @Valid @RequestBody WarrantyRequest request,
            Authentication authentication) {

        WarrantyResponse response = warrantyService.updateWarranty(
                productId,
                request,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<WarrantyResponse>builder()
                        .success(true)
                        .message("Warranty updated successfully")
                        .data(response)
                        .build()
        );
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<String>> delete(
            @PathVariable Long productId,
            Authentication authentication) {

        warrantyService.deleteWarranty(
                productId,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Warranty deleted successfully")
                        .data("Deleted")
                        .build()
        );
    }
}