package com.akaene.geo.altimeter.service;

import com.akaene.geo.altimeter.exception.CadastreException;
import com.akaene.geo.altimeter.exception.ParcelNotFoundException;
import com.akaene.geo.altimeter.model.Position;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.client.MockRestServiceServer;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.akaene.geo.altimeter.service.CadastreService.CADASTRAL_AREA_PARAM;
import static com.akaene.geo.altimeter.service.CadastreService.PARCEL_NUMBER_PARAM;
import static org.hamcrest.Matchers.startsWith;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.queryParam;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@ExtendWith(SpringExtension.class)
@RestClientTest(CadastreService.class)
public class CadastreServiceTest {

    private static final String AREA = "729710";
    private static final String PARCEL_NO = "844/7";

    @Autowired
    private MockRestServiceServer mockServer;

    @Autowired
    private CadastreService sut;

    @Autowired
    private Environment environment;

    @Test
    void resolveParcelPositionSendsRequestToCadastreServiceWithCadastralAreaAndParcelNumber() {
        mockServer.expect(requestTo(startsWith(environment.getRequiredProperty("cadastre.parcels.service"))))
                  .andExpect(queryParam(CADASTRAL_AREA_PARAM, AREA))
                  .andExpect(queryParam(PARCEL_NUMBER_PARAM, PARCEL_NO))
                  .andRespond(withSuccess(readTestData("sample-parcel-data.xml"),
                          MediaType.APPLICATION_XML));
        sut.resolveParcelPosition(AREA, PARCEL_NO);
    }

    private static String readTestData(String fileName) {
        final List<String> lines;
        try {
            lines = Files
                    .readAllLines(Paths.get(
                            CadastreServiceTest.class.getClassLoader().getResource("data/" + fileName).toURI()));
            return String.join("\n", lines);
        } catch (IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void resolveParcelPositionResolvesParcelPositionFromReturnedFeatureInfoXml() {
        mockServer.expect(requestTo(startsWith(environment.getRequiredProperty("cadastre.parcels.service"))))
                  .andRespond(withSuccess(readTestData("sample-parcel-data.xml"),
                          MediaType.APPLICATION_XML));
        final Position result = sut.resolveParcelPosition(AREA, PARCEL_NO);
        assertEquals(50.082123, result.getLatitude().doubleValue());
        assertEquals(14.262004, result.getLongitude().doubleValue());
    }

    @Test
    void resolveParcelPositionThrowsCadasterExceptionWhenServerReturnsError() {
        mockServer.expect(requestTo(startsWith(environment.getRequiredProperty("cadastre.parcels.service"))))
                  .andRespond(withServerError());
        assertThrows(CadastreException.class, () -> sut.resolveParcelPosition(AREA, PARCEL_NO));
    }

    @Test
    void resolveParcelPositionThrowsParcelNotFoundExceptionWhenServerReturnsDocumentWithoutParcelInfo() {
        mockServer.expect(requestTo(startsWith(environment.getRequiredProperty("cadastre.parcels.service"))))
                  .andRespond(withSuccess(readTestData("sample-error-data.xml"),
                          MediaType.APPLICATION_XML));
        assertThrows(ParcelNotFoundException.class, () -> sut.resolveParcelPosition(AREA, PARCEL_NO));
    }
}
