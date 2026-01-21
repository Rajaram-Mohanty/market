package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.AccountStatus;
import org.projects.market.model.Seller;
import org.projects.market.service.SellerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
    private final SellerService sellerService;

    @PatchMapping("/seller/{id}/status/{status}")
    public ResponseEntity<Seller> updateSellerStatus(
            @PathVariable Long id,
            @PathVariable AccountStatus status) throws Exception {

        Seller updateSeller = sellerService.updateSellerAccountStatus(id, status);
        return new ResponseEntity<>(updateSeller, HttpStatus.OK);

    }
}
