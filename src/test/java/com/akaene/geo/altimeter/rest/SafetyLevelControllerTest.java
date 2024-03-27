package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.model.SafetyData;
import com.akaene.geo.altimeter.service.GeoService;
import com.akaene.geo.altimeter.service.ReportService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SafetyLevelController.class)
@Import(RestTestConfig.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SafetyLevelControllerTest extends RestControllerTestBase {

    private static final String PATH = "/safetyAltitudeLevel";

    @MockBean
    private GeoService geoService;

    @MockBean
    private ReportService reportService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void resolveSafetyAltitudeLevelGetsSafetyDataFromServiceUsingSpecifiedLatitudeAndLongitude() throws Exception {
        final SafetyData safetyData = new SafetyData(50.101, 14.227, 355.0, 455.0);
        when(geoService.resolveSafetyAltitudeLevel(safetyData.getLatitude(), safetyData.getLongitude()))
                .thenReturn(safetyData);
        final MvcResult mvcResult = mockMvc.perform(
                get(PATH).param("latitude", safetyData.getLatitude().toString())
                         .param("longitude", safetyData.getLongitude().toString())).andExpect(status().isOk())
                                           .andReturn();
        final SafetyData result = readValue(mvcResult, SafetyData.class);
        assertEquals(safetyData, result);
        verify(geoService).resolveSafetyAltitudeLevel(safetyData.getLatitude(), safetyData.getLongitude());
    }

    @Test
    void resolveSafetyAltitudeLevelThrowsBadRequestWhenLatitudeParameterIsMissing() throws Exception {
        mockMvc.perform(get(PATH).param("longitude", "14.227"))
               .andExpect(status().isBadRequest()).andReturn();
        verify(geoService, never()).resolveSafetyAltitudeLevel(anyDouble(), anyDouble());
    }

    @Test
    void resolveSafetyAltitudeLevelThrowsBadRequestWhenLongitudeParameterIsMissing() throws Exception {
        mockMvc.perform(get(PATH).param("latitude", "50.101"))
               .andExpect(status().isBadRequest()).andReturn();
        verify(geoService, never()).resolveSafetyAltitudeLevel(anyDouble(), anyDouble());
    }

    @Test
    void getReportOfSafetyAltitudeLevelPassesLanguageToReportServiceForReportGeneration() throws Exception {
        final SafetyData safetyData = new SafetyData(50.101, 14.227, 355.0, 455.0);
        final Resource res = new ByteArrayResource("test".getBytes());
        when(reportService.generateSafetyLevelReport(anyDouble(), anyDouble(), anyString())).thenReturn(res);
        final String lang = "cs";
        mockMvc.perform(
                get(PATH + "/report").param("latitude", safetyData.getLatitude().toString())
                                     .param("longitude", safetyData.getLongitude().toString())
                                     .param("lang", lang)).andExpect(status().isOk());
        verify(reportService).generateSafetyLevelReport(safetyData.getLatitude(), safetyData.getLongitude(), lang);
    }
}
