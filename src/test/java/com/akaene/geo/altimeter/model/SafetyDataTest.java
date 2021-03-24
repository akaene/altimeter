package com.akaene.geo.altimeter.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SafetyDataTest {

    @Test
    void constructorCalculatesMaxObstacleHeight() {
        final double alt = 355.0;
        final double safetyLevel = 450.0;
        final SafetyData sut = new SafetyData(50.1, 14.26, alt, safetyLevel);
        assertEquals(safetyLevel - alt, (double) sut.getMaxObstacleHeight());
    }

    @Test
    void constructorForGeoDataCalculatesMaxObstacleHeight() {
        final double alt = 355.0;
        final double safetyLevel = 450.0;
        final SafetyData sut = new SafetyData(new GeoData(50.1, 14.26, alt), safetyLevel);
        assertEquals(safetyLevel - alt, (double) sut.getMaxObstacleHeight());
    }
}
