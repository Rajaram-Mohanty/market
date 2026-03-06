package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Home;
import org.projects.market.model.HomeCategory;
import org.projects.market.response.ApiResponse;
import org.projects.market.service.HomeCategoryService;
import org.projects.market.service.HomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @GetMapping
    public ApiResponse HomeControllerHandler() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Welcome to the multivendor ecommerece platform");
        return apiResponse;
    }

    @GetMapping("/home-page")
    public ResponseEntity<Home> getHomePageData() {
        List<HomeCategory> categories = homeCategoryService.getAllHomeCategories();
        Home homePageData = homeService.createHomePageData(categories);
        return new ResponseEntity<>(homePageData, HttpStatus.ACCEPTED);
    }
}
