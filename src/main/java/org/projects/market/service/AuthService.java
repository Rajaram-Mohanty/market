package org.projects.market.service;

import org.projects.market.request.LoginRequest;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;

public interface AuthService {

    void sentLoginOtp(String email) throws Exception;
    String createUser(SignupRequest req) throws Exception;
    AuthResponse signing(LoginRequest req);
}
