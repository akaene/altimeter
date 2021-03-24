package com.akaene.geo.altimeter;

import org.gdal.gdal.gdal;
import org.gdal.ogr.ogr;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Altimeter {

    public static void main(String[] args) {
        gdal.AllRegister();
        ogr.RegisterAll();
        SpringApplication.run(Altimeter.class, args);
    }
}
