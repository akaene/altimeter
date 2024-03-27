/**
 * TermIt
 * Copyright (C) 2019 Czech Technical University in Prague
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
package com.akaene.geo.altimeter.rest.servlet;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.security.Principal;

/**
 * Stores user info into the Mapped Diagnostic Context for the logging framework.
 */
@Component
public class DiagnosticsContextFilter extends GenericFilterBean {

    static final String MDC_KEY = "username";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        final HttpServletRequest req = (HttpServletRequest) servletRequest;
        final Principal principal = req.getUserPrincipal();
        boolean mdcSet = false;
        if (principal != null) {
            final String username = req.getUserPrincipal().getName();
            MDC.put(MDC_KEY, username);
            mdcSet = true;
        }

        try {
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            if (mdcSet) {
                MDC.remove(MDC_KEY);
            }
        }
    }
}
