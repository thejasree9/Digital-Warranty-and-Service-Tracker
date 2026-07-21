package org.example.digital_warranty.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.digital_warranty.dto.ProductResponse;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductPageResponse {

    private List<ProductResponse> products;

    private int currentPage;

    private int totalPages;

    private long totalProducts;

    private boolean hasNext;

    private boolean hasPrevious;
}