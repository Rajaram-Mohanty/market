package org.projects.market.service;

import org.projects.market.model.User;

public interface UserService {

    User findUserByJwtToken(String jwtToken) throws Exception;
    User findUserByEmail(String email) throws Exception;
}
