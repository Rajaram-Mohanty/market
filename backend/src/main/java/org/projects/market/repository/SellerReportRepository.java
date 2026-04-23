package org.projects.market.repository;

import org.projects.market.model.SellerReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
    @org.springframework.data.jpa.repository.Query("SELECT sr FROM SellerReport sr LEFT JOIN FETCH sr.seller WHERE sr.seller.id = :sellerId")
    SellerReport findBySellerId(@org.springframework.data.repository.query.Param("sellerId") Long sellerId);
}
