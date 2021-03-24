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
