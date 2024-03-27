package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.security.AuthenticationFailure;
import com.akaene.geo.altimeter.security.AuthenticationSuccess;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Profile("test")
public class RestTestConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.anyRequest().anonymous()).build();
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
