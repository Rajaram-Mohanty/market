package org.projects.market.repository;

import org.projects.market.domain.AccountStatus;
import org.projects.market.model.Seller;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    @EntityGraph(attributePaths = {"pickupAddress"})
    Seller findByEmail(String email);

    @EntityGraph(attributePaths = {"pickupAddress"})
    List<Seller> findByAccountStatus(AccountStatus accountStatus);
}
