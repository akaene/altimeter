package com.akaene.geo.altimeter.config;

import com.akaene.geo.altimeter.security.AuthenticationFailure;
import com.akaene.geo.altimeter.security.AuthenticationSuccess;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@Profile("auth")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/").permitAll()
            .antMatchers("/static/**").permitAll()
            .antMatchers("/login").permitAll().anyRequest().authenticated()
            .and().formLogin().loginProcessingUrl("/login").permitAll()
            .successHandler(authenticationSuccess)
            .failureHandler(authenticationFailure).and()
            .logout().logoutSuccessHandler(authenticationSuccess)
            .deleteCookies("JSESSIONID")
            .and().cors().and().csrf().disable()
            .exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser(username).password(passwordEncoder.encode(password)).roles("USER");
    }
}
