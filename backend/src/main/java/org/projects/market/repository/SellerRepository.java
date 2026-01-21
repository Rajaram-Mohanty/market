package org.projects.market.repository;

import org.projects.market.domain.AccountStatus;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Seller findByEmail(String email);
    List<Seller> findByAccountStatus(AccountStatus accountStatus);
}
