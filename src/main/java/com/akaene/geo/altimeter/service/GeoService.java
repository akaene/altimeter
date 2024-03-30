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
package com.akaene.geo.altimeter.service;

import com.akaene.geo.altimeter.model.GeoData;
import com.akaene.geo.altimeter.model.SafetyData;

/**
 * Provides geographical data at coordinates.
 */
public interface GeoService {

    /**
     * Resolves altitude for the specified WGS 84 coordinates.
     *
     * @param latitude  WGS 84 latitude
     * @param longitude WGS 84 longitude
     * @return Geographical data containing info about the input position, including its elevation
     */
    GeoData resolveElevation(Double latitude, Double longitude);

    /**
     * Resolves basic safety level at the specified WGS 84 coordinates.
     *
     * @param latitude  WGS 84 latitude
     * @param longitude WGS 84 longitude
     * @return Safety data, containing information about safety level at the specified coordinates
     */
    SafetyData resolveSafetyAltitudeLevel(Double latitude, Double longitude);
}
