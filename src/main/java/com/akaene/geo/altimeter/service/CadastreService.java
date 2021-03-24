package com.akaene.geo.altimeter.service;

import com.akaene.geo.altimeter.exception.CadastreException;
import com.akaene.geo.altimeter.exception.ParcelNotFoundException;
import com.akaene.geo.altimeter.model.Position;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.IOException;
import java.util.Objects;

@Service
@PropertySource("classpath:altimeter.properties")
public class CadastreService {

    private static final Logger LOG = LoggerFactory.getLogger(CadastreService.class);

    static final String CADASTRAL_AREA_PARAM = "UPPER_ZONING_ID";
    static final String PARCEL_NUMBER_PARAM = "TEXT";

    private final String cadastreParcelService;

    private final RestTemplate client;

    private final DocumentBuilderFactory xmlDocBuilderFactory = DocumentBuilderFactory.newInstance();

    @Autowired
    public CadastreService(RestTemplateBuilder clientBuilder,
                           @Value("${cadastre.parcels.service}") String cadastreParcelService) {
        this.cadastreParcelService = cadastreParcelService;
        this.client = clientBuilder.build();
    }

    public Position resolveParcelPosition(String cadastralArea, String parcelNo) {
        Objects.requireNonNull(cadastralArea);
        Objects.requireNonNull(parcelNo);

        final UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(cadastreParcelService);
        uriBuilder.queryParam(CADASTRAL_AREA_PARAM, cadastralArea)
                  .queryParam(PARCEL_NUMBER_PARAM, parcelNo);
        try {
            LOG.info("Getting location from cadastre. Cadastral area = {}, parcel number = {}.", cadastralArea,
                    parcelNo);
            LOG.debug("Getting parcel info from cadastral service at {}.", uriBuilder.toUriString());
            final ResponseEntity<Resource> resp = client.getForEntity(uriBuilder.toUriString(), Resource.class);
            assert resp.getBody() != null;
            final Position position = resolvePositionFromParcelData(resp.getBody(), cadastralArea, parcelNo);
            LOG.info("Parcel position is {}.", position);
            return position;
        } catch (CadastreException e) {
            throw e;
        } catch (RuntimeException e) {
            throw new CadastreException("Unable to resolve parcel position from cadastre.", e);
        }
    }

    private Position resolvePositionFromParcelData(Resource data, String cadastralArea, String parcelNo) {
        final DocumentBuilder builder;
        try {
            builder = xmlDocBuilderFactory.newDocumentBuilder();
            final Document document = builder.parse(data.getInputStream());
            XPath xPath = XPathFactory.newInstance().newXPath();
            final Node result = (Node) xPath
                    .evaluate("//*[local-name()='referencePoint']//*[local-name()='pos']", document,
                            XPathConstants.NODE);
            if (result == null) {
                LOG.warn("Parcel {} not found in cadastral area {}.", parcelNo, cadastralArea);
                throw new ParcelNotFoundException("Parcel " + parcelNo + " not found in area " + cadastralArea + ".");
            }
            final String[] coordinates = result.getTextContent().split(" ");
            assert coordinates.length == 2;
            return new Position(Double.parseDouble(coordinates[0].trim()), Double.parseDouble(coordinates[1].trim()));
        } catch (ParserConfigurationException | IOException | SAXException | XPathExpressionException e) {
            throw new CadastreException("Unable to retrieve parcel data from cadastre response.", e);
        }
    }
}
