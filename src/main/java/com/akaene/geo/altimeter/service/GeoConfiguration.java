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
