package com.akaene.geo.altimeter.security;

import jakarta.servlet.annotation.WebListener;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

@WebListener
public class SessionTimeoutManager implements HttpSessionListener {

    private static final int SESSION_TIMEOUT = 60 * 60 * 24;

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        se.getSession().setMaxInactiveInterval(SESSION_TIMEOUT);
    }
}
