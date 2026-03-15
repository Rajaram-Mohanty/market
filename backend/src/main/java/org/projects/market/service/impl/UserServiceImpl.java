package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.config.JwtProvider;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.model.Cart;
import org.projects.market.model.Seller;
import org.projects.market.model.User;
import org.projects.market.repository.CartRepository;
import org.projects.market.repository.SellerRepository;
import org.projects.market.repository.UserRepository;
import org.projects.market.model.Address;
import org.projects.market.repository.AddressRepository;
import org.projects.market.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@org.springframework.transaction.annotation.Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final SellerRepository sellerRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user;
        }

        // If no customer User found, check if this is a seller and create a linked User
        // on demand
        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null) {
            User sellerUser = new User();
            sellerUser.setEmail(seller.getEmail());
            sellerUser.setFullName(seller.getSellerName());
            sellerUser.setRole(USER_ROLE.ROLE_SELLER);

            sellerUser = userRepository.save(sellerUser);

            Cart cart = new Cart();
            cart.setUser(sellerUser);
            cartRepository.save(cart);

            return sellerUser;
        }

        throw new Exception("user not found with email");
    }

    @Override
    public User addAddress(String jwtToken, Address address) throws Exception {
        User user = this.findUserByJwtToken(jwtToken);
        user.getAddresses().add(address);
        return userRepository.save(user);
    }
}
