package org.projects.market.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.projects.market.model.Order;
import org.projects.market.model.PaymentOrder;
import org.projects.market.model.User;

import java.util.Set;

public interface PaymentService {

    PaymentOrder createOrder(User user, Set<Order> orders);

    PaymentOrder getPaymentOrderById(Long OrderId) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;

    Boolean proceedPaymentOrder(PaymentOrder paymentOrder,
                                String paymentId,
                                String paymentLinkId) throws Exception;

    PaymentLink createRazorpayPaymentLink(User user,
                                          Long amount,
                                          Long orderId) throws RazorpayException;

    String createStripePaymentLink(User user,
                                   Long amount,
                                   Long orderId) throws StripeException;
}
