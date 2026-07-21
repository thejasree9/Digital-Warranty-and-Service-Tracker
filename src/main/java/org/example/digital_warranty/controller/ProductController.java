package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ProductRequest;
import org.example.digital_warranty.dto.ProductResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.dto.response.ProductPageResponse;
import org.example.digital_warranty.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> addProduct(
            @Valid @RequestBody ProductRequest request,
            Authentication authentication) {

        ProductResponse response = productService.addProduct(
                request,
                null,
                authentication.getName()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<ProductResponse>builder()
                                .success(true)
                                .message("Product added successfully")
                                .data(response)
                                .build()
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ProductPageResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "productName") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            Authentication authentication) {

        ProductPageResponse response = productService.getAllProducts(
                page,
                size,
                sortBy,
                direction,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<ProductPageResponse>builder()
                        .success(true)
                        .message("Products fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(
            @PathVariable Long id,
            Authentication authentication) {

        ProductResponse response = productService.getProductById(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<ProductResponse>builder()
                        .success(true)
                        .message("Product fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchProduct(
            @RequestParam String name) {

        List<ProductResponse> response =
                productService.searchByProductName(name);

        return ResponseEntity.ok(
                ApiResponse.<List<ProductResponse>>builder()
                        .success(true)
                        .message("Products fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/brand")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchBrand(
            @RequestParam String brand) {

        List<ProductResponse> response =
                productService.searchByBrand(brand);

        return ResponseEntity.ok(
                ApiResponse.<List<ProductResponse>>builder()
                        .success(true)
                        .message("Products fetched successfully")
                        .data(response)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request,
            Authentication authentication) {

        ProductResponse response = productService.updateProduct(
                id,
                request,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<ProductResponse>builder()
                        .success(true)
                        .message("Product updated successfully")
                        .data(response)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {

        productService.deleteProduct(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Product deleted successfully")
                        .data("Deleted")
                        .build()
        );
    }
}