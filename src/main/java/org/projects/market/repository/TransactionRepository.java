package org.projects.market.repository;

import org.projects.market.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    List<Transaction> findBySellerId(Long sellerId);
}
