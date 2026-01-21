package org.projects.market.controller;

import org.projects.market.response.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public ApiResponse HomeControllerHandler(){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Welcome to the multivendor ecommerece platform");
        return apiResponse;
    }
}
