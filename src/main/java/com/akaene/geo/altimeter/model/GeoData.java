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
