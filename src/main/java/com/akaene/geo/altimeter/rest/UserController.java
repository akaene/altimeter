package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.security.LoginStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping(value = "/current", produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginStatus getCurrent(Principal principal) {
        return new LoginStatus(true, true, null, null);
    }
}
