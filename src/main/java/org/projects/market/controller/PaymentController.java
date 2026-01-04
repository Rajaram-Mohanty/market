package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.*;
import org.projects.market.response.ApiResponse;
import org.projects.market.response.PaymentLinkResponse;
import org.projects.market.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerReportService sellerReportService;
    private final SellerService sellerService;
    private final TransactionService transactionService;


    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam() String paymentLinkId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        PaymentLinkResponse paymentLinkResponse;

        User user = userService.findUserByJwtToken(jwt);

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        boolean isSuccess = paymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if (isSuccess) {
            // 4. If payment is verified, update seller reports and create transactions
            for (Order order : paymentOrder.getOrders()) {
                transactionService.createTransaction(order); // Create financial record

                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);

                // Update seller stats [11:36:42]
                report.setTotalOrders(report.getTotalOrders() + 1);
                report.setTotalEarning(report.getTotalEarning() + order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());

                sellerReportService.updateSellerReport(report);
            }

            ApiResponse res = new ApiResponse();
            res.setMessage("Payment successful");
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        ApiResponse res = new ApiResponse();
        res.setMessage("Payment failed");
        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }
}
