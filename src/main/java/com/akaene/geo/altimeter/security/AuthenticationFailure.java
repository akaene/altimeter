package com.akaene.geo.altimeter.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Profile("auth")
public class AuthenticationFailure implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper;

    public AuthenticationFailure(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        AuthenticationException e) throws IOException {
        final LoginStatus loginStatus = new LoginStatus(false, false, null, e.getMessage());
        objectMapper.writeValue(httpServletResponse.getOutputStream(), loginStatus);
    }
}
