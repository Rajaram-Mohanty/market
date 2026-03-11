package org.projects.market.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.HomeCategory;
import org.projects.market.repository.HomeCategoryRepository;
import org.projects.market.service.HomeCategoryService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;
    private final Cloudinary cloudinary;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        return homeCategoryRepository.saveAll(homeCategories);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory category, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        if (category.getImage() != null) {
            existingCategory.setImage(category.getImage());
        }
        if (category.getCategoryId() != null) {
            existingCategory.setCategoryId(category.getCategoryId());
        }
        if (category.getName() != null) {
            existingCategory.setName(category.getName());
        }
        return homeCategoryRepository.save(existingCategory);
    }

    @Override
    public void deleteHomeCategory(Long id) throws Exception {
        HomeCategory category = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("Category not found"));

        // Delete from Cloudinary if image exists
        if (category.getImage() != null && !category.getImage().isEmpty()) {
            try {
                String publicId = extractPublicIdFromUrl(category.getImage());
                if (publicId != null) {
                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                }
            } catch (Exception e) {
                System.out.println("Failed to delete image from Cloudinary: " + e.getMessage());
            }
        }

        homeCategoryRepository.deleteById(id);
    }

    private String extractPublicIdFromUrl(String url) {
        if (url == null || url.isEmpty())
            return null;
        String[] parts = url.split("/");
        if (parts.length == 0)
            return null;

        String lastPart = parts[parts.length - 1];
        int dotIndex = lastPart.lastIndexOf('.');
        if (dotIndex != -1) {
            return lastPart.substring(0, dotIndex);
        }
        return lastPart;
    }
}
