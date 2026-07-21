package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.ProductRequest;
import org.example.digital_warranty.dto.ProductResponse;
import org.example.digital_warranty.dto.response.ProductPageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
public interface ProductService {

    ProductResponse addProduct(
            ProductRequest request,
            MultipartFile invoice,
            String email
    );
    List<ProductResponse> searchByProductName(String productName);

    List<ProductResponse> searchByBrand(String brand);
    List<ProductResponse> getAllProducts(String email);

    ProductResponse getProductById(Long id, String email);

    ProductResponse updateProduct(Long id, ProductRequest request, String email);

    void deleteProduct(Long id, String email);
    ProductPageResponse getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction,
            String email
    );
}