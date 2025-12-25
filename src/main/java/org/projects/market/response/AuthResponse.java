package org.projects.market.response;

import lombok.Data;
import org.projects.market.domain.USER_ROLE;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
