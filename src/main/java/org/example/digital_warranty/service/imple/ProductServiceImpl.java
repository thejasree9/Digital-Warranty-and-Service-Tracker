package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ProductRequest;
import org.example.digital_warranty.dto.ProductResponse;
import org.example.digital_warranty.dto.response.ProductPageResponse;
import org.example.digital_warranty.entity.Product;
import org.example.digital_warranty.entity.User;
import org.example.digital_warranty.exception.ResourceNotFoundException;
import org.example.digital_warranty.exception.UnauthorizedException;
import org.example.digital_warranty.repository.ProductRepository;
import org.example.digital_warranty.repository.UserRepository;
import org.example.digital_warranty.service.CloudinaryService;
import org.example.digital_warranty.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    @Override
    public ProductResponse addProduct(
            ProductRequest request,
            MultipartFile invoice,
            String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String invoiceUrl = null;

        if (invoice != null && !invoice.isEmpty()) {
            invoiceUrl = cloudinaryService.uploadFile(invoice);
        } else if (request.getInvoiceUrl() != null) {
            invoiceUrl = request.getInvoiceUrl();
        }

        Product product = Product.builder()
                .productName(request.getProductName())
                .brand(request.getBrand())
                .model(request.getModel())
                .serialNumber(request.getSerialNumber())
                .purchaseDate(request.getPurchaseDate())
                .price(request.getPrice())
                .invoiceUrl(invoiceUrl)
                .user(user)
                .build();

        product = productRepository.save(product);

        return map(product);
    }

    @Override
    public List<ProductResponse> getAllProducts(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return productRepository.findByUserId(user.getId())
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id, String email) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Unauthorized");
        }

        return map(product);
    }
    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request,
            MultipartFile file,
            String email) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Unauthorized");
        }

        // Update product details
        product.setProductName(request.getProductName());
        product.setBrand(request.getBrand());
        product.setModel(request.getModel());
        product.setSerialNumber(request.getSerialNumber());
        product.setPurchaseDate(request.getPurchaseDate());
        product.setPrice(request.getPrice());

        // Update invoice if a new file is uploaded
        if (file != null && !file.isEmpty()) {

            String invoiceUrl = cloudinaryService.uploadFile(file);

            product.setInvoiceUrl(invoiceUrl);

        } else if (request.getInvoiceUrl() != null) {

            // Keep the existing invoice URL if no new file is uploaded
            product.setInvoiceUrl(request.getInvoiceUrl());

        }

        Product updatedProduct = productRepository.save(product);

        return map(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id, String email) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Unauthorized");
        }

        productRepository.delete(product);
    }
    @Override
    public List<ProductResponse> searchByProductName(String productName) {

        return productRepository
                .findByProductNameContainingIgnoreCase(productName)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<ProductResponse> searchByBrand(String brand) {

        return productRepository
                .findByBrandContainingIgnoreCase(brand)
                .stream()
                .map(this::map)
                .toList();
    }
    @Override
    public ProductPageResponse getAllProducts(
            int page,
            int size,
            String sortBy,
            String direction,
            String email) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage =
                productRepository.findByUserEmail(email, pageable);
        System.out.println("Products found: " + productPage.getTotalElements());
        System.out.println("Content size: " + productPage.getContent().size());
        return ProductPageResponse.builder()
                .products(
                        productPage.getContent()
                                .stream()
                                .map(this::map)
                                .toList()
                )
                .currentPage(productPage.getNumber())
                .totalPages(productPage.getTotalPages())
                .totalProducts(productPage.getTotalElements())
                .hasNext(productPage.hasNext())
                .hasPrevious(productPage.hasPrevious())
                .build();
    }

    private ProductResponse map(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .brand(product.getBrand())
                .model(product.getModel())
                .serialNumber(product.getSerialNumber())
                .purchaseDate(product.getPurchaseDate())
                .createdAt(product.getCreatedAt())
                .price(product.getPrice())
                .invoiceUrl(product.getInvoiceUrl())
                .build();
    }
}