package org.projects.market.service;

import org.projects.market.request.LoginRequest;
import org.projects.market.response.AuthResponse;
import org.projects.market.response.SignupRequest;

public interface AuthService {

    String createUser(SignupRequest req) throws Exception;
    AuthResponse signing(LoginRequest req) throws Exception;
    void forgotPassword(String email) throws Exception;
    void resetPassword(String email, String otp, String newPassword) throws Exception;
}
