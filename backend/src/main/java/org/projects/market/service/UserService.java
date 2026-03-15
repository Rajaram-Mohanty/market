package org.projects.market.service;

import org.projects.market.model.User;
import org.projects.market.model.Address;

public interface UserService {

    User findUserByJwtToken(String jwtToken) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User addAddress(String jwtToken, Address address) throws Exception;
}
