package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.security.AuthenticationFailure;
import com.akaene.geo.altimeter.security.AuthenticationSuccess;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class RestTestConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccess authenticationSuccess() {
        return new AuthenticationSuccess(new ObjectMapper());
    }

    @Bean
    public AuthenticationFailure authenticationFailure() {
        return new AuthenticationFailure(new ObjectMapper());
    }
}
