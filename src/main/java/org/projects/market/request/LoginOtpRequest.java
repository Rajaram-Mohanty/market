package org.projects.market.request;

import lombok.Data;
import org.projects.market.domain.USER_ROLE;

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    private USER_ROLE role;
}
