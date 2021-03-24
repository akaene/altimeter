package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.model.Position;
import com.akaene.geo.altimeter.service.CadastreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastre")
public class CadastreController {

    private final CadastreService service;

    @Autowired
    public CadastreController(CadastreService service) {
        this.service = service;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/parcelPosition", produces = MediaType.APPLICATION_JSON_VALUE)
    public Position resolveParcelPosition(@RequestParam("area") String area, @RequestParam("parcel") String parcel) {
        return service.resolveParcelPosition(area, parcel);
    }
}
