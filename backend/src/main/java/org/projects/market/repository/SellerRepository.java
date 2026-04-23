package org.projects.market.repository;

import org.projects.market.domain.AccountStatus;
import org.projects.market.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    @Query("SELECT s FROM Seller s LEFT JOIN FETCH s.pickupAddress WHERE s.email = :email")
    Seller findByEmail(@Param("email") String email);

    @Query("SELECT s FROM Seller s LEFT JOIN FETCH s.pickupAddress WHERE s.accountStatus = :accountStatus")
    List<Seller> findByAccountStatus(@Param("accountStatus") AccountStatus accountStatus);

    @Override
    @Query("SELECT s FROM Seller s LEFT JOIN FETCH s.pickupAddress")
    List<Seller> findAll();
}
