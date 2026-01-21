package org.projects.market.repository;

import org.projects.market.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryId(String category);
}
