package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.domain.USER_ROLE;
import org.projects.market.model.User;
import org.projects.market.repository.UserRepository;
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

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) {

        String jwt = authService.createUser(req);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Register Success");
        res.setRole(USER_ROLE.ROLE_COSTUMER);

        return ResponseEntity.ok(res);
    }
}
