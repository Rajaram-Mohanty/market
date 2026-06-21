package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.request.LoginRequest;
import org.projects.market.request.ResetPasswordRequest;
import org.projects.market.response.ApiResponse;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;
import org.projects.market.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        String jwt = authService.createUser(req);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Register Success");
        res.setRole(USER_ROLE.ROLE_COSTUMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> signInHandler(@RequestBody LoginRequest req) throws Exception {

        AuthResponse authResponse = authService.signing(req);

        return ResponseEntity.ok(authResponse);
    }

    /**
     * Step 1 of forgot password: user submits their email.
     * Backend generates an OTP and emails it to them.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPasswordHandler(@RequestParam String email) throws Exception {

        authService.forgotPassword(email);

        ApiResponse res = new ApiResponse();
        res.setMessage("A password reset OTP has been sent to your email.");

        return ResponseEntity.ok(res);
    }

    /**
     * Step 2 of forgot password: user submits email + OTP + new password.
     * Backend verifies OTP and updates the password.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPasswordHandler(@RequestBody ResetPasswordRequest req) throws Exception {

        authService.resetPassword(req.getEmail(), req.getOtp(), req.getNewPassword());

        ApiResponse res = new ApiResponse();
        res.setMessage("Password reset successfully. You can now log in with your new password.");

        return ResponseEntity.ok(res);
    }
}
