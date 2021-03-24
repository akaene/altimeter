package com.akaene.geo.altimeter.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Profile("auth")
public class AuthenticationSuccess implements AuthenticationSuccessHandler, LogoutSuccessHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationSuccess.class);

    private final ObjectMapper objectMapper;

    public AuthenticationSuccess(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException {
        LOG.trace("Successfully logged in user '{}'.", authentication.getName());
        final LoginStatus loginStatus = new LoginStatus(true, authentication.isAuthenticated(),
                authentication.getName(), null);
        objectMapper.writeValue(httpServletResponse.getOutputStream(), loginStatus);
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                Authentication authentication) throws IOException {
        LOG.trace("Successfully logged out user '{}'.", authentication.getName());
        final LoginStatus loginStatus = new LoginStatus(false, true, null, null);
        objectMapper.writeValue(httpServletResponse.getOutputStream(), loginStatus);
    }
}
