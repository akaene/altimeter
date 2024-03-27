package com.akaene.geo.altimeter.rest;

import com.akaene.geo.altimeter.model.GeoData;
import com.akaene.geo.altimeter.service.GeoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ElevationController.class)
@Import(RestTestConfig.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ElevationControllerTest extends RestControllerTestBase {

    private static final String PATH = "/elevation";

    @MockBean
    private GeoService service;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void resolveElevationGetsGeoDataFromServiceUsingSpecifiedLatitudeAndLongitude() throws Exception {
        final GeoData data = new GeoData(50.101, 14.227, 355.0);
        when(service.resolveElevation(data.getLatitude(), data.getLongitude())).thenReturn(data);
        final MvcResult mvcResult = mockMvc.perform(get(PATH).param("latitude", data.getLatitude().toString())
                                                             .param("longitude", data.getLongitude().toString()))
                                           .andExpect(status().isOk()).andReturn();
        final GeoData result = readValue(mvcResult, GeoData.class);
        assertEquals(data, result);
        verify(service).resolveElevation(data.getLatitude(), data.getLongitude());
    }

    @Test
    void resolveElevationThrowsBadRequestWhenLatitudeParameterIsMissing() throws Exception {
        mockMvc.perform(get(PATH).param("longitude", "14.227"))
               .andExpect(status().isBadRequest()).andReturn();
        verify(service, never()).resolveElevation(anyDouble(), anyDouble());
    }

    @Test
    void resolveElevationThrowsBadRequestWhenLongitudeParameterIsMissing() throws Exception {
        mockMvc.perform(get(PATH).param("latitude", "50.101"))
               .andExpect(status().isBadRequest()).andReturn();
        verify(service, never()).resolveElevation(anyDouble(), anyDouble());
    }
}
