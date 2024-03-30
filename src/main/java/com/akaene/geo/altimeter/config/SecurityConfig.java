/*
 * Altimeter
 * Copyright (C) 2024 AKAENE Partners
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
package com.akaene.geo.altimeter.config;

import com.akaene.geo.altimeter.security.AuthenticationFailure;
import com.akaene.geo.altimeter.security.AuthenticationSuccess;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@Profile("auth")
public class SecurityConfig {

    @Value("${auth.username}")
    private String username;

    @Value("${auth.password}")
    private String password;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationSuccess authenticationSuccess;

    private final AuthenticationFailure authenticationFailure;

    public SecurityConfig(PasswordEncoder passwordEncoder,
                          AuthenticationSuccess authenticationSuccess,
                          AuthenticationFailure authenticationFailure) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationSuccess = authenticationSuccess;
        this.authenticationFailure = authenticationFailure;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.requestMatchers("/").permitAll()
                                                      .requestMatchers("/static/**").permitAll()
                                                      .requestMatchers("/login").permitAll().anyRequest()
                                                      .authenticated())
                   .exceptionHandling(
                           eh -> eh.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                   .formLogin(auth -> auth.successHandler(authenticationSuccess)
                                          .failureHandler(authenticationFailure))
                   .logout(auth -> auth.logoutSuccessHandler(authenticationSuccess).deleteCookies("JSESSIONID"))
                   .csrf(AbstractHttpConfigurer::disable)
                   .cors(c -> c.configurationSource(corsConfig())).build();
    }

    @Bean
    public UserDetailsService users() {
        final UserDetails user = User.builder()
                                     .username(username)
                                     .password(passwordEncoder.encode(password))
                                     .roles("USER")
                                     .build();
        return new InMemoryUserDetailsManager(user);
    }

    private static CorsConfigurationSource corsConfig() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
        corsConfiguration.setAllowedOrigins(Collections.singletonList("*"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
