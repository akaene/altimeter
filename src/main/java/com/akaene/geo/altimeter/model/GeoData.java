package com.akaene.geo.altimeter.model;

import java.util.Objects;

public class GeoData extends Position {

    private Double elevation;

    public GeoData() {
    }

    public GeoData(Double latitude, Double longitude, Double elevation) {
        super(latitude, longitude);
        this.elevation = elevation;
    }

    public Double getElevation() {
        return elevation;
    }

    public void setElevation(Double elevation) {
        this.elevation = elevation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        GeoData geoData = (GeoData) o;
        return Objects.equals(elevation, geoData.elevation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), elevation);
    }

    @Override
    public String toString() {
        return "GeoData{" +
                "latitude=" + getLatitude() +
                ", longitude=" + getLongitude() +
                ", elevation=" + elevation +
                '}';
    }
}
