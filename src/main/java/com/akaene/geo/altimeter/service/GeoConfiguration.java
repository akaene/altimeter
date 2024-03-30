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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@PropertySource("classpath:altimeter.properties")
public class GeoConfiguration {

    private final int sourceEpsgCode;

    private final int targetEpsgCode;

    public GeoConfiguration(@Value("${epsg.source}") int sourceEpsgCode, @Value("${epsg.target}") int targetEpsgCode) {
        this.sourceEpsgCode = sourceEpsgCode;
        this.targetEpsgCode = targetEpsgCode;
    }

    public int getSourceEpsgCode() {
        return sourceEpsgCode;
    }

    public int getTargetEpsgCode() {
        return targetEpsgCode;
    }
}
