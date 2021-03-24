# Altimeter

Software for resolving surface elevation and safety level altitude based on map data and coordinates.

## Requirements

This system requires GDAL to be installed on a system, together with Java bindings.

It has been tested on GDAL 2.2.2 with GDAL Java bindings 2.4.0.

GDAL JNI bindings and GDAL data directory need to be configured using the following environment variables:

* `LD_LIBRARY_PATH=/path_to/gdal-2.4.1/swig/java`
* `GDAL_DATA=/path_to/gdal/1.9`

`GDAL_DATA` directory depends on system GDAL installation and can be determined using
`gdal-config --datadir`

GDAL JNI bindings need to be build for the system, instructions can be found at [https://trac.osgeo.org/gdal/wiki/GdalOgrInJavaBuildInstructionsUnix](https://trac.osgeo.org/gdal/wiki/GdalOgrInJavaBuildInstructionsUnix).
[This](http://geoexamples.blogspot.com/2012/05/running-gdal-java.html) article is also quite helpful.

## Configuration

`application.properties` contains Spring related configuration like server port, context path etc.

`altimeter.properties` contains domain-specific configuration. More specifically, the following parameters are expected:

| Parameter | Explanation |
| --------- | ----------- |
| `data.directory` | Path to the directory containing map data. |
| `data.surface` | Name of the file containing the elevation model of the surface within the data directory. |
| `data.zeroLevel` | A comma-separated list of names of files (within the data directory) representing elevation models where the safety altitude is the same as surface elevation. |
| `epsg.source` | EPSG code of the source coordinate system, i.e., the coordinate system in which request parameters are specified by client. Usually, this would be WGS 84. |
| `epsg.target` | EPSG code of the target coordinate system, i.e., the coordinate system used by the map data. |
| `auth.username` | Username of the single user for running in Secure mode. |
| `auth.password` | Password of the single user for running in Secure mode. |

## Secure mode

It is possible to run Altimeter in secure mode. In this mode, the services provided by the backend require authentication.
To use secure mode, build the UI with environment variable `REACT_APP_USE_AUTH`, build the whole project and set active Spring profile to `auth` for runtime.

There is a single user for the secure mode and the application uses an in-memory authentication manager with this user. The user is configured
in `application.properties` (see above). The UI will first display a login dialog before allowing the user to access any of the functionality.

## More info

GDAL documentation can be found [here](https://gdal.org/java/index.html?overview-summary.html).
