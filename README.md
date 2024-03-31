# Altimeter

Software for resolving surface elevation and safety level altitude based on map data and coordinates.

## Running in Docker

To simplify deployment, a Docker configuration is provided. All that one needs to provide are the geographical data
that Altimeter will use to resolve surface elevation and safety level area elevation.

See `docker-compose.yml` for the required configuration and example values.


## Running Directly on Host

It is also possible to run Altimeter directly on the host system (expected Linux-based). This is a bit more complicated
and requires installation of GDAL (see below).

### Requirements

- Java 17
- GDAL 3.6.4

GDAL JNI bindings and GDAL data directory need to be configured using the following environment variables:

* `LD_LIBRARY_PATH=gdal/3.6.4/jni/`
  * Contains pre-build Java bindings for GDAL version 3.6.4.
* `GDAL_DATA`

`GDAL_DATA` directory depends on system GDAL installation and can be determined using
`gdal-config --datadir`.

If you want to use a different version of GDAL, see `gdal/how-to.md`.

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

## License

GPL
