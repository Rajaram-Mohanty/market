package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Seller;
import org.projects.market.model.Transaction;
import org.projects.market.service.SellerService;
import org.projects.market.service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final SellerService sellerService;

    // Endpoint for sellers to get their own transaction history
    @GetMapping("/seller")
    public ResponseEntity<List<Transaction>> getTransactionBySeller(
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Fetch seller profile from JWT
        Seller seller = sellerService.getSellerProfile(jwt);

        // Retrieve transactions for this specific seller
        List<Transaction> transactions = transactionService.getTransactionsBySellerId(seller);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Endpoint for Admin to view all transactions in the system [11:52:45]
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
