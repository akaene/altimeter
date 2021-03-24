package com.akaene.geo.altimeter.model;

import java.util.Objects;

public class SafetyData extends GeoData {

    private Double safetyAltitudeLevel;

    private String safetyZone;

    private Double maxObstacleHeight;

    public SafetyData() {
    }

    public SafetyData(Double latitude, Double longitude, Double altitude, Double safetyAltitudeLevel) {
        super(latitude, longitude, altitude);
        this.safetyAltitudeLevel = safetyAltitudeLevel;
        this.maxObstacleHeight = calculateMaxObstacleHeight();
    }

    private Double calculateMaxObstacleHeight() {
        return safetyAltitudeLevel - getElevation();
    }

    public SafetyData(GeoData position, Double safetyAltitudeLevel) {
        super(position.getLatitude(), position.getLongitude(), position.getElevation());
        this.safetyAltitudeLevel = safetyAltitudeLevel;
        this.maxObstacleHeight = calculateMaxObstacleHeight();
    }

    public Double getSafetyAltitudeLevel() {
        return safetyAltitudeLevel;
    }

    public void setSafetyAltitudeLevel(Double safetyAltitudeLevel) {
        this.safetyAltitudeLevel = safetyAltitudeLevel;
    }

    /**
     * Identifies the safety zone determining the safety altitude level.
     *
     * @return Name of the safety zone
     */
    public String getSafetyZone() {
        return safetyZone;
    }

    public void setSafetyZone(String safetyZone) {
        this.safetyZone = safetyZone;
    }

    public Double getMaxObstacleHeight() {
        return maxObstacleHeight;
    }

    public void setMaxObstacleHeight(Double maxObstacleHeight) {
        this.maxObstacleHeight = maxObstacleHeight;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        SafetyData that = (SafetyData) o;
        return Objects.equals(safetyAltitudeLevel, that.safetyAltitudeLevel) &&
                Objects.equals(safetyZone, that.safetyZone) &&
                Objects.equals(maxObstacleHeight, that.maxObstacleHeight);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), safetyAltitudeLevel, safetyZone, maxObstacleHeight);
    }

    @Override
    public String toString() {
        return "SafetyData{" +
                "safetyAltitudeLevel=" + safetyAltitudeLevel +
                "safetyZone=" + safetyZone +
                "maxObstacleHeight=" + maxObstacleHeight +
                super.toString() +
                '}';
    }
}
