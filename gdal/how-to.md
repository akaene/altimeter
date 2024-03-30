# How to Make GDAL Work

If you are using the Docker image, there should be no additional steps, it will use the pre-build GDAL JAR and .so files
contained in this folder (it assumes Ubuntu Jammy, on which the target image is based, uses GDAL 3.6.4).

If you are attempting to use a local installation of GDAL, do the following:

1. Find out your GDAL version by running `gdalinfo --version`
2. Download the appropriate version of GDAL sources from https://gdal.org/download.html and unpack it (let's call the target folder `$GDAL_INSTALL_DIR`)
3. Build GDAL with Java bindings by running (assuming required packages like GCC, Ant, CMake are installed):
    1. Create directory `${GDAL_INSTALL_DIR}/build` and `cd` into it.
    2. Run `cmake .. -DCMAKE_INSTALL_PREFIX=$PWD/install-gdal -DBUILD_JAVA_BINDINGS=ON`
    3. Run `cmake --build .`
    4. Run `cmake --build . --target install`
4. Make a new subdirectory in `gdal` in this project's root, name it according to the version of GDAL you use
5. Copy file `${GDAL_INSTALL_DIR}/build/swig/java/gdal.jar` into the new GDAL directory
6. Copy file `${GDAL_INSTALL_DIR}/build/swig/java/libgdalalljni.so` into the new GDAL directory's `jni` sub-directory
7. Change version of GDAL in `pom.xml`

