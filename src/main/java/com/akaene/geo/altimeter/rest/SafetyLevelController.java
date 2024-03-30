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

import com.akaene.geo.altimeter.exception.AltimeterException;
import com.akaene.geo.altimeter.model.SafetyData;
import com.akaene.geo.altimeter.service.GeoService;
import com.akaene.geo.altimeter.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/safetyAltitudeLevel")
public class SafetyLevelController {

    private static final Logger LOG = LoggerFactory.getLogger(SafetyLevelController.class);

    private final GeoService geoService;

    private final ReportService reportService;

    @Autowired
    public SafetyLevelController(GeoService geoService,
                                 ReportService reportService) {
        this.geoService = geoService;
        this.reportService = reportService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public SafetyData resolveSafetyAltitudeLevel(@RequestParam Double latitude, @RequestParam Double longitude) {
        LOG.debug("Resolving safety altitude level information for WGS 84 position [{}, {}].", latitude, longitude);
        return geoService.resolveSafetyAltitudeLevel(latitude, longitude);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/report")
    public ResponseEntity<Resource> getReportOfSafetyAltitudeLevel(@RequestParam Double latitude,
                                                                   @RequestParam Double longitude,
                                                                   @RequestParam(required = false, defaultValue = "en") String lang) {
        LOG.debug("Creating report of safety altitude level information for WGS 84 position [{}, {}].", latitude,
                longitude);
        try {
            final Resource report = reportService.generateSafetyLevelReport(latitude, longitude, lang);
            return ResponseEntity.ok()
                                 .contentLength(report.contentLength())
                                 .contentType(MediaType.APPLICATION_PDF)
                                 .header(HttpHeaders.CONTENT_DISPOSITION,
                                         "attachment; filename=\"report.pdf\"")
                                 .body(report);
        } catch (IOException e) {
            throw new AltimeterException("Unable to attach report to response.", e);
        }
    }
}
