package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Deal;
import org.projects.market.response.ApiResponse;
import org.projects.market.service.DealService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {

    private final DealService dealService;

    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        Deal createdDeal = dealService.createDeal(deal);
        return new ResponseEntity<>(createdDeal, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(
            @PathVariable Long id,
            @RequestBody Deal deal
    ) throws Exception {
        Deal updatedDeal = dealService.updateDeal(deal, id);
        return new ResponseEntity<>(updatedDeal, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteDeal(@PathVariable Long id) throws Exception {
        dealService.deleteDeal(id);
        ApiResponse response = new ApiResponse();
        response.setMessage("Deal deleted successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
