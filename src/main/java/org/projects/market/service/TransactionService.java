package org.projects.market.service;

import org.projects.market.model.Order;
import org.projects.market.model.Seller;
import org.projects.market.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();

}
