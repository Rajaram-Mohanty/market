package org.projects.market.service.impl;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.projects.market.config.JwtProvider;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.model.Cart;
import org.projects.market.model.Seller;
import org.projects.market.model.User;
import org.projects.market.model.VerificationCode;
import org.projects.market.repository.CartRepository;
import org.projects.market.repository.SellerRepository;
import org.projects.market.repository.UserRepository;
import org.projects.market.repository.VerificationCodeRepository;
import org.projects.market.request.LoginRequest;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;
import org.projects.market.service.AuthService;
import org.projects.market.service.EmailService;
import org.projects.market.utils.OtpUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepository sellerRepository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;

    @Override
    public String createUser(SignupRequest req) throws Exception {

        User user = userRepository.findByEmail(req.getEmail());

        if (user != null) {
            throw new Exception("An account with this email already exists.");
        }

        User createdUser = new User();
        createdUser.setEmail(req.getEmail());
        createdUser.setFullName(req.getFullName());
        createdUser.setRole(USER_ROLE.ROLE_COSTUMER);
        createdUser.setMobile("0000000000");
        createdUser.setPassword(passwordEncoder.encode(req.getPassword()));

        user = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_COSTUMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse signing(LoginRequest req) throws Exception {
        String username = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("login success");

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    @Override
    public void forgotPassword(String email) throws Exception {

        // Check if a customer with this email exists
        User user = userRepository.findByEmail(email);
        // Also check sellers
        Seller seller = sellerRepository.findByEmail(email);

        if (user == null && seller == null) {
            throw new Exception("No account found with this email address.");
        }

        // Delete any existing OTP for this email
        VerificationCode existing = verificationCodeRepository.findByEmail(email);
        if (existing != null) {
            verificationCodeRepository.delete(existing);
        }

        // Generate and save a fresh OTP
        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        // Send the OTP via email
        String subject = "Market — Password Reset OTP";
        String text = "Your password reset OTP is: <strong>" + otp + "</strong><br/>"
                + "This OTP is valid for a single use. Do not share it with anyone.";

        emailService.sendVerificationOtpEmail(email, otp, subject, text);
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) throws Exception {

        // Validate the OTP
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("Invalid or expired OTP.");
        }

        // Update password for customer
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }

        // Update password for seller
        Seller seller = sellerRepository.findByEmail(email);
        if (seller != null) {
            seller.setPassword(passwordEncoder.encode(newPassword));
            sellerRepository.save(seller);
        }

        // Invalidate the OTP after successful reset
        verificationCodeRepository.delete(verificationCode);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
