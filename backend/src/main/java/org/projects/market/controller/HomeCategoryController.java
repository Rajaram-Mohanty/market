package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Home;
import org.projects.market.model.HomeCategory;
import org.projects.market.service.HomeCategoryService;
import org.projects.market.service.HomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/admin/home-categories")
    public ResponseEntity<Home> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategories
    ) {
        List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);
        Home homePageData = homeService.createHomePageData(categories);
        return new ResponseEntity<>(homePageData, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/home-categories")
    public ResponseEntity<List<HomeCategory>> getHomeCategories() {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory
    ) throws Exception {
        HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }
}