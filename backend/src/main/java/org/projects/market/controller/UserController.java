package org.projects.market.controller;

import lombok.RequiredArgsConstructor;
import org.projects.market.model.Address;
import org.projects.market.model.User;
import org.projects.market.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> userProfileHandler(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/users/address")
    public ResponseEntity<User> addAddressHandler(
            @RequestBody Address address,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User updatedUser = userService.addAddress(jwt, address);

        return ResponseEntity.ok(updatedUser);
    }
}
