package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.request.LoginOtpRequest;
import org.projects.market.request.LoginRequest;
import org.projects.market.response.ApiResponse;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;
import org.projects.market.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor // why @Autowired is not used in the pdf
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

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {

        authService.sentLoginOtp(req.getEmail(),req.getRole());


        ApiResponse res = new ApiResponse();

        res.setMessage("otp sent successfully");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> sendOtpHandler(@RequestBody LoginRequest req) throws Exception {

        AuthResponse authResponse = authService.signing(req);

        return ResponseEntity.ok(authResponse);
    }
}
