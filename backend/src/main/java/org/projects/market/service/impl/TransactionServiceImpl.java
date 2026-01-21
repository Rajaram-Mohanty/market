package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Order;
import org.projects.market.model.Seller;
import org.projects.market.model.Transaction;
import org.projects.market.repository.SellerRepository;
import org.projects.market.repository.TransactionRepository;
import org.projects.market.service.TransactionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) {
        Seller seller = sellerRepository.findById(order.getSellerId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);


        // Save the transaction to the database [11:48:45]
        return transactionRepository.save(transaction);
    }


    @Override
    public List<Transaction> getTransactionsBySellerId(Seller seller) {
        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
