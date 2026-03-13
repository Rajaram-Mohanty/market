package org.projects.market.service.impl;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.projects.market.exceptions.ProductException;
import org.projects.market.model.Category;
import org.projects.market.model.Product;
import org.projects.market.model.Seller;
import org.projects.market.repository.CategoryRepository;
import org.projects.market.repository.ProductRepository;
import org.projects.market.request.CreateProductRequest;
import org.projects.market.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Seller seller) {
        Category category1 = categoryRepository.findByCategoryId(req.getCategory());

        if (category1 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = categoryRepository.findByCategoryId(req.getCategory2());

        if (category2 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory2());
            category.setLevel(2);
            category.setParentCategory(category1);
            category2 = categoryRepository.save(category);
        }

        Category category3 = categoryRepository.findByCategoryId(req.getCategory3());

        if (category3 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory3());
            category.setLevel(3);
            category.setParentCategory(category2);
            category3 = categoryRepository.save(category);
        }

        int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setSellingPrice(req.getSellingPrice());
        product.setImages(req.getImages());
        product.setMrpPrice(req.getMrpPrice());
        product.setSizes(req.getSizes());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0) {
            throw new IllegalArgumentException("Actual price must be greater than 0*");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / 100) * 100;
        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, CreateProductRequest req) throws ProductException {
        Product product = findProductById(productId);

        if (req.getTitle() != null && !req.getTitle().isEmpty()) {
            product.setTitle(req.getTitle());
        }
        if (req.getDescription() != null && !req.getDescription().isEmpty()) {
            product.setDescription(req.getDescription());
        }
        if (req.getColor() != null && !req.getColor().isEmpty()) {
            product.setColor(req.getColor());
        }
        if (req.getSellingPrice() > 0) {
            product.setSellingPrice(req.getSellingPrice());
        }
        if (req.getMrpPrice() > 0) {
            product.setMrpPrice(req.getMrpPrice());
        }
        if (req.getImages() != null && !req.getImages().isEmpty()) {
            product.setImages(req.getImages());
        }
        if (req.getSizes() != null && !req.getSizes().isEmpty()) {
            product.setSizes(req.getSizes());
        }

        if (product.getMrpPrice() > 0 && product.getSellingPrice() > 0) {
            int discountPercentage = calculateDiscountPercentage(product.getMrpPrice(), product.getSellingPrice());
            product.setDiscountPercent(discountPercentage);
        }

        // Handle category updates if category info is sent
        if (req.getCategory() != null && !req.getCategory().isEmpty()) {
            Category category1 = categoryRepository.findByCategoryId(req.getCategory());
            if (category1 == null) {
                Category category = new Category();
                category.setCategoryId(req.getCategory());
                category.setLevel(1);
                category1 = categoryRepository.save(category);
            }

            Category category2 = categoryRepository.findByCategoryId(req.getCategory2());
            if (category2 == null && req.getCategory2() != null && !req.getCategory2().isEmpty()) {
                Category category = new Category();
                category.setCategoryId(req.getCategory2());
                category.setLevel(2);
                category.setParentCategory(category1);
                category2 = categoryRepository.save(category);
            }

            Category category3 = categoryRepository.findByCategoryId(req.getCategory3());
            if (category3 == null && req.getCategory3() != null && !req.getCategory3().isEmpty()) {
                Category category = new Category();
                category.setCategoryId(req.getCategory3());
                category.setLevel(3);
                category.setParentCategory(category2);
                category3 = categoryRepository.save(category);
            }

            if (category3 != null) {
                product.setCategory(category3);
            }
        }

        return productRepository.save(product);
    }

    @Override
    @Transactional(readOnly = true)
    public Product findProductById(Long productId) throws ProductException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("product not found with id" + productId));

        // Initialize lazy images while the session is open
        if (product.getImages() != null) {
            product.getImages().size();
        }

        return product;
    }

    @Override
    public List<Product> searchProduct(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> getAllProducts(String category, String brand, String colors, String sizes,
            Integer minPrice, Integer maxPrice, Integer minDiscount,
            String sort, String stock, Integer pageNumber) {

        Specification<Product> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Filtering by Category [07:58:04]
            if (category != null && !category.isBlank()) {
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
            }

            // Filtering by Color [07:59:44]
            if (colors != null && !colors.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }

            // Filtering by Sizes [08:00:13]
            if (sizes != null) {
                predicates.add(criteriaBuilder.equal(root.get("size"), sizes));
            }

            // Filtering by Minimum Price [08:00:35]
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }

            // Filtering by Maximum Price [08:01:03]
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }

            // Filtering by Minimum Discount [08:01:32]
            if (minDiscount != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount));
            }

            // Filtering by Stock Status [08:02:10]
            if (stock != null) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        // Handling Pagination and Sorting [08:03:15]
        Pageable pageable;
        if (sort != null && !sort.isEmpty()) {
            pageable = switch (sort) {
                case "price_low" ->
                    PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
                case "price_high" ->
                    PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
            };
        } else {
            pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.unsorted());
        }

        Page<Product> page = productRepository.findAll(spec, pageable);

        // Initialize lazy-loaded images collection within the transaction
        page.getContent().forEach(p -> {
            if (p.getImages() != null) {
                p.getImages().size();
            }
        });

        return page;
    }

    @Override
    public List<Product> getProductBySellerId(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }
}
