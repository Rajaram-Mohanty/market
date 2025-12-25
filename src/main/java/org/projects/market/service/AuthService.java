package org.projects.market.service;

import org.projects.market.response.SignupRequest;

public interface AuthService {

    String createUser(SignupRequest req);
}
