package org.projects.market.service.impl;

import lombok.RequiredArgsConstructor;
import org.projects.market.config.JwtProvider;
import org.projects.market.model.User;
import org.projects.market.repository.UserRepository;
import org.projects.market.service.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("user not found with email");
        }
        return user;
    }
}
