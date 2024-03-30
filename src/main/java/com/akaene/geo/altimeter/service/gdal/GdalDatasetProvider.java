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
package com.akaene.geo.altimeter.service.gdal;

import com.akaene.geo.altimeter.exception.AltimeterException;
import jakarta.annotation.PostConstruct;
import org.gdal.gdal.Dataset;
import org.gdal.gdal.gdal;
import org.gdal.gdalconst.gdalconstConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
@PropertySource("classpath:altimeter.properties")
public class GdalDatasetProvider {

    private static final Logger LOG = LoggerFactory.getLogger(GdalDatasetProvider.class);

    @Value("${data.surface}")
    private String surfaceElevationFile;

    @Value("${data.zeroLevel}")
    private String zeroLevelFiles;

    @Value("${data.directory}")
    private String mapDataDirectory;

    private Dataset surfaceDataset;

    private List<Dataset> zeroLevelDatasets;

    private List<Dataset> safetyLevelDatasets;

    @PostConstruct
    private void loadDatasets() {
        loadSurfaceDataset();
        loadSafetyLevelDatasets();
    }

    private void loadSurfaceDataset() {
        final String surfacePath = mapDataDirectory + File.separator + surfaceElevationFile;
        LOG.debug("Loading surface elevation model dataset from \"{}\".", surfacePath);
        final File surface = new File(surfacePath);
        if (!surface.exists()) {
            throw new AltimeterException("Unable to find surface elevation model file at \"" + surfacePath + "\"!");
        }
        this.surfaceDataset = gdal.Open(surfacePath, gdalconstConstants.GA_ReadOnly);
    }

    private void loadSafetyLevelDatasets() {
        LOG.debug("Loading safety level datasets from directory \"{}\".", mapDataDirectory);
        final File dataDirectoryPath = new File(mapDataDirectory);
        assert dataDirectoryPath.exists() && dataDirectoryPath.isDirectory();
        final Set<String> zeroLevelNames = new HashSet<>(Arrays.asList(zeroLevelFiles.split(",")));
        this.zeroLevelDatasets = new ArrayList<>();
        this.safetyLevelDatasets = new ArrayList<>();
        for (File file : dataDirectoryPath.listFiles()) {
            if (file.getName().equals(surfaceElevationFile)) {
                continue;
            }
            LOG.trace("Loading dataset from \"{}\".", file);
            final Dataset ds = gdal.Open(file.getAbsolutePath(), gdalconstConstants.GA_ReadOnly);
            if (ds == null) {
                LOG.error("File \"{}\" is not a valid GDAL dataset. Skipping it.", file);
                continue;
            }
            if (zeroLevelNames.contains(file.getName())) {
                zeroLevelDatasets.add(ds);
            } else {
                safetyLevelDatasets.add(ds);
            }
        }
        LOG.debug("Loaded {} zero level data files.", zeroLevelDatasets.size());
        LOG.debug("Loaded {} safety level data files.", safetyLevelDatasets.size());
    }

    Dataset getSurfaceDataset() {
        return surfaceDataset;
    }

    List<Dataset> getSafetyLevelDatasets() {
        return Collections.unmodifiableList(safetyLevelDatasets);
    }

    /**
     * Gets datasets which represent rasters with safety level altitude same as the surface elevation.
     */
    List<Dataset> getZeroLevelDatasets() {
        return Collections.unmodifiableList(zeroLevelDatasets);
    }
}
