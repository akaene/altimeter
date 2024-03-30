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

import com.akaene.geo.altimeter.exception.CoordinatesOutOfBoundsException;
import com.akaene.geo.altimeter.exception.ReportGenerationException;
import com.akaene.geo.altimeter.model.GeoData;
import com.akaene.geo.altimeter.model.SafetyData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.transform.*;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class ReportService {

    private static final String XSLT_DIR = "xslt";
    private static final String FOP_CONFIG = XSLT_DIR + File.separator + "fop.xconf";
    private static final String REPORT_TEMPLATE = XSLT_DIR + File.separator + "report-template.xsl";
    private static final String REPORT_UNLIMITED = XSLT_DIR + File.separator + "report-unlimited.xsl";

    private final GeoService geoService;

    private final XmlMapper xmlMapper;

    private final FopFactory fopFactory;
    private final TransformerFactory transformerFactory;

    @Autowired
    public ReportService(GeoService geoService) throws IOException, SAXException {
        this.geoService = geoService;
        this.xmlMapper = new XmlMapper();
        this.fopFactory = FopFactory.newInstance(new File(FOP_CONFIG));
        this.transformerFactory = TransformerFactory.newInstance();
    }

    /**
     * Resolves basic safety level information at the specified WGS 84 coordinates and generates a PDF report with the results.
     *
     * @param latitude  WGS 84 latitude
     * @param longitude WGS 84 longitude
     * @param language  Language of the report
     * @return Safety data report in PDF
     */
    public Resource generateSafetyLevelReport(Double latitude, Double longitude, String language) {
        try {
            final SafetyData safetyData = geoService.resolveSafetyAltitudeLevel(latitude, longitude);
            safetyData.setElevation(roundToThreeDecimals(safetyData.getElevation()));
            safetyData.setSafetyAltitudeLevel(roundToThreeDecimals(safetyData.getSafetyAltitudeLevel()));
            safetyData.setMaxObstacleHeight(roundToThreeDecimals(safetyData.getMaxObstacleHeight()));
            return generateReport(safetyData, REPORT_TEMPLATE, language);
        } catch (CoordinatesOutOfBoundsException e) {
            return generateUnlimitedReport(latitude, longitude, language);
        }
    }

    private Resource generateUnlimitedReport(Double latitude, Double longitude, String language) {
        final GeoData data = geoService.resolveElevation(latitude, longitude);
        data.setElevation(roundToThreeDecimals(data.getElevation()));
        return generateReport(data, REPORT_UNLIMITED, language);
    }

    private Double roundToThreeDecimals(Double value) {
        BigDecimal bd = new BigDecimal(value);
        bd = bd.setScale(3, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    private Resource generateReport(GeoData data, String reportTemplate, String language) {
        try (final ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            final Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, fopFactory.newFOUserAgent(), bos);

            final Transformer transformer =
                    transformerFactory.newTransformer(new StreamSource(new FileInputStream(reportTemplate)));
            transformer.setParameter("lang", language);

            final Result res = new SAXResult(fop.getDefaultHandler());
            transformer.transform(new StreamSource(new ByteArrayInputStream(xmlMapper.writeValueAsBytes(data))), res);

            return new ByteArrayResource(bos.toByteArray());
        } catch (JsonProcessingException e) {
            throw new ReportGenerationException("Unable to generate report XML.", e);
        } catch (FOPException | TransformerConfigurationException e) {
            throw new ReportGenerationException("Unable to initialize XSLT transformation to PDF.", e);
        } catch (TransformerException | IOException e) {
            throw new ReportGenerationException("Unable transform report to to PDF.", e);
        }
    }
}
