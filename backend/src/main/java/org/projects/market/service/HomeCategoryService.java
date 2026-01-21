package org.projects.market.service;

import org.projects.market.model.HomeCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory HomeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> HomeCategory);
    HomeCategory updateHomeCategory(HomeCategory HomeCategory, Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories();
}
