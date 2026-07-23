package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.WarrantyRequest;
import org.example.digital_warranty.dto.WarrantyResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.CloudinaryService;
import org.example.digital_warranty.service.WarrantyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/warranty")
@RequiredArgsConstructor
public class WarrantyController {

    private final WarrantyService warrantyService;
    private final CloudinaryService cloudinaryService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<WarrantyResponse>> add(

            @RequestPart("warranty")
            @Valid WarrantyRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file,

            Authentication authentication
    ) {

        WarrantyResponse response =
                warrantyService.addWarranty(
                        request,
                        file,
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

            Authentication authentication
    ) {

        WarrantyResponse response =
                warrantyService.getWarranty(
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

    @PutMapping(
            value="/{productId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<WarrantyResponse>> update(

            @PathVariable Long productId,

            @RequestPart("warranty")
            @Valid WarrantyRequest request,

            @RequestPart(value = "file", required = false)
            MultipartFile file,

            Authentication authentication
    ) {

        WarrantyResponse response =
                warrantyService.updateWarranty(
                        productId,
                        request,
                        file,
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

            Authentication authentication
    ) {

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

    @GetMapping
    public ResponseEntity<ApiResponse<List<WarrantyResponse>>> getAll(

            Authentication authentication
    ) {

        List<WarrantyResponse> response =
                warrantyService.getAllWarranties(
                        authentication.getName()
                );

        return ResponseEntity.ok(
                ApiResponse.<List<WarrantyResponse>>builder()
                        .success(true)
                        .message("Warranties fetched successfully")
                        .data(response)
                        .build()
        );
    }
}