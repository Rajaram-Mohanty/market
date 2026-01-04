package org.projects.market.service;

import org.projects.market.model.Seller;
import org.projects.market.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
