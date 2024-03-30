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
