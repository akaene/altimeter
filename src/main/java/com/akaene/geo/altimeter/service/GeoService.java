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
