package org.projects.market.service;

import org.projects.market.domain.USER_ROLE;
import org.projects.market.request.LoginRequest;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;

public interface AuthService {

    void sentLoginOtp(String email, USER_ROLE role) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse signing(LoginRequest req);
}
