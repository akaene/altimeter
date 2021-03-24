package com.akaene.geo.altimeter.service.gdal;

import com.akaene.geo.altimeter.exception.AltimeterException;
import com.akaene.geo.altimeter.exception.CoordinatesOutOfBoundsException;
import com.akaene.geo.altimeter.model.GeoData;
import com.akaene.geo.altimeter.model.SafetyData;
import com.akaene.geo.altimeter.service.GeoConfiguration;
import com.akaene.geo.altimeter.service.GeoService;
import org.gdal.gdal.Dataset;
import org.gdal.ogr.Geometry;
import org.gdal.ogr.ogr;
import org.gdal.osr.CoordinateTransformation;
import org.gdal.osr.SpatialReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GdalGeoService implements GeoService {

    private static final Logger LOG = LoggerFactory.getLogger(GdalGeoService.class);

    private static final String DATASET_TITLE_PROPERTY = "TITLE";

    private final GdalDatasetProvider datasetProvider;

    private final CoordinateTransformation coordinateTransform;

    @Autowired
    public GdalGeoService(GdalDatasetProvider datasetProvider, GeoConfiguration config) {
        this.datasetProvider = datasetProvider;
        final SpatialReference source = new SpatialReference();
        source.ImportFromEPSG(config.getSourceEpsgCode());
        final SpatialReference target = new SpatialReference();
        target.ImportFromEPSG(config.getTargetEpsgCode());
        this.coordinateTransform = CoordinateTransformation.CreateCoordinateTransformation(source, target);
    }

    @Override
    public GeoData resolveElevation(Double latitude, Double longitude) {
        LOG.trace("Resolving surface elevation at WGS 84 position [{}, {}]", latitude, longitude);
        final Geometry geometry = transformCoordinatesToTarget(latitude, longitude);
        try {
            final double elevation = resolvePointLevel(geometry, datasetProvider.getSurfaceDataset());
            LOG.trace("Surface elevation is {}.", elevation);
            return new GeoData(latitude, longitude, elevation);
        } catch (CoordinatesOutOfBoundsException e) {
            LOG.warn("Coordinates [{}, {}] out of bounds of the map raster.", latitude, longitude);
            throw new CoordinatesOutOfBoundsException(
                    "Coordinates [" + latitude + ", " + longitude + "] out of bounds of the map raster.");
        }
    }

    private Geometry transformCoordinatesToTarget(Double latitude, Double longitude) {
        final Geometry geometry = ogr.CreateGeometryFromWkt(String.format("POINT (%f %f)", longitude, latitude));
        geometry.Transform(coordinateTransform);
        return geometry;
    }

    private double resolvePointLevel(Geometry point, Dataset dataset) {
        LOG.trace("Resolving point level from dataset {}.", dataset.GetFileList());
        final double x = point.GetX();
        final double y = point.GetY();
        final double[] gt = dataset.GetGeoTransform();
        int px = (int) ((x - gt[0]) / gt[1]);
        int py = (int) ((y - gt[3]) / gt[5]);
        final double[] rasterResult = new double[1];
        if (pointOutsideRaster(px, py, dataset)) {
            LOG.trace("Point outside of raster of dataset {}.", dataset.GetFileList());
            throw new CoordinatesOutOfBoundsException("Point out of bounds of the map raster.");
        }
        dataset.GetRasterBand(1).ReadRaster(px, py, 1, 1, rasterResult);
        if (Double.isNaN(rasterResult[0])) {
            throw new CoordinatesOutOfBoundsException("Point out of bounds of the map raster.");
        }
        return rasterResult[0];
    }

    private boolean pointOutsideRaster(int x, int y, Dataset dataset) {
        return x < 0 || x >= dataset.getRasterXSize() || y < 0 || y >= dataset.getRasterYSize();
    }

    private Optional<Dataset> getZeroLevelDatasetResult(Geometry point) {
        return datasetProvider.getZeroLevelDatasets().stream().filter(ds -> {
            final double[] gt = ds.GetGeoTransform();
            int px = (int) ((point.GetX() - gt[0]) / gt[1]);
            int py = (int) ((point.GetY() - gt[3]) / gt[5]);
            if (!pointOutsideRaster(px, py, ds)) {
                final double[] rasterResult = new double[1];
                ds.GetRasterBand(1).ReadRaster(px, py, 1, 1, rasterResult);
                return !Double.isNaN(rasterResult[0]);
            }
            return false;
        }).findAny();
    }

    @Override
    public SafetyData resolveSafetyAltitudeLevel(Double latitude, Double longitude) {
        LOG.trace("Resolving safety altitude level at WGS 84 position [{}, {}]", latitude, longitude);
        final GeoData position = resolveElevation(latitude, longitude);
        final Geometry point = transformCoordinatesToTarget(latitude, longitude);
        final Optional<Dataset> matchingZeroLevelDs = getZeroLevelDatasetResult(point);
        if (matchingZeroLevelDs.isPresent()) {
            LOG.debug("Position is within the zero level datasets.");
            // If the point is within zero level datasets, its safety altitude level is the same as surface elevation
            final SafetyData data = new SafetyData(position, position.getElevation());
            data.setSafetyZone(getSafetyZone(matchingZeroLevelDs.get()));
            return data;
        }
        final Optional<DatasetWithLevel> minLevel = findLowestDatasetInPosition(point);

        final SafetyData data = new SafetyData(position,
                minLevel.orElseThrow(
                        () -> new AltimeterException("Unable to resolve minimum safety level.")).safetyAltitudeLevel);
        if (data.getSafetyAltitudeLevel() == Double.MAX_VALUE) {
            LOG.warn("Coordinates [{}, {}] out of bounds of the map raster.", latitude, longitude);
            throw new CoordinatesOutOfBoundsException(
                    "Coordinates [" + latitude + ", " + longitude + "] out of bounds of the safety level datasets.");
        }
        data.setSafetyZone(getSafetyZone(minLevel.get().dataset));
        LOG.trace("Safety altitude level is {}.", data.getSafetyAltitudeLevel());
        return data;
    }

    private Optional<DatasetWithLevel> findLowestDatasetInPosition(Geometry point) {
        return datasetProvider.getSafetyLevelDatasets().stream().map(ds -> {
                try {
                    final Double pointLevel = resolvePointLevel(point, ds);
                    return new DatasetWithLevel(ds, pointLevel);
                } catch (CoordinatesOutOfBoundsException e) {
                    // Swallow the exception, this just means that the point is outside the bounds of the particular dataset
                    return new DatasetWithLevel(null, Double.MAX_VALUE);
                }
            }).min(DatasetWithLevel::compareTo);
    }

    private String getSafetyZone(Dataset dataset) {
        if (dataset.GetMetadata_Dict().containsKey(DATASET_TITLE_PROPERTY)) {
            return dataset.GetMetadata_Dict().get(DATASET_TITLE_PROPERTY).toString();
        }
        return null;
    }

    private static class DatasetWithLevel implements Comparable<DatasetWithLevel> {
        private Dataset dataset;
        private Double safetyAltitudeLevel;

        private DatasetWithLevel(Dataset dataset, Double safetyAltitudeLevel) {
            this.dataset = dataset;
            this.safetyAltitudeLevel = safetyAltitudeLevel;
        }

        @Override
        public int compareTo(DatasetWithLevel o) {
            return safetyAltitudeLevel.compareTo(o.safetyAltitudeLevel);
        }
    }
}
