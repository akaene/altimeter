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
package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.model.GeoData;
import com.akaene.geo.altimeter.service.GeoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/elevation")
public class ElevationController {

    private static final Logger LOG = LoggerFactory.getLogger(ElevationController.class);

    private final GeoService geoService;

    @Autowired
    public ElevationController(GeoService geoService) {
        this.geoService = geoService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public GeoData resolveElevation(@RequestParam Double latitude, @RequestParam Double longitude) {
        LOG.debug("Resolving geographical data for WGS 84 position [{}, {}].", latitude, longitude);
        return geoService.resolveElevation(latitude, longitude);
    }
}
