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
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SafetyLevelController.class)
@Import(RestTestConfig.class)
@AutoConfigureMockMvc
@WithMockUser
@ActiveProfiles("auth")
public class SecuredSafetyLevelControllerTest extends RestControllerTestBase {

    private static final String PATH = "/safetyAltitudeLevel";

    @MockBean
    private GeoService geoService;

    @MockBean
    private ReportService reportService;

    @Autowired
    private MockMvc mockMvc;

    @WithAnonymousUser
    @Test
    void resolveSafetyAltitudeLevelThrowsUnauthorizedForAnonymousAccess() throws Exception {
        mockMvc.perform(get(PATH).param("latitude", Double.toString(50.101))
                                 .param("longitude", Double.toString(14.227))).andExpect(status().isUnauthorized());
        verify(geoService, never()).resolveSafetyAltitudeLevel(any(), any());
    }

    @WithAnonymousUser
    @Test
    void getReportOfSafetyAltitudeLevelThrowsUnauthorizedForAnonymousAccess() throws Exception {
        mockMvc.perform(get(PATH + "/report").param("latitude", Double.toString(50.101))
                                             .param("longitude", Double.toString(14.227)))
               .andExpect(status().isUnauthorized());
        verify(reportService, never()).generateSafetyLevelReport(any(), any(), any());
    }

    @WithMockUser
    @Test
    void resolveSafetyAltitudeLevelGetsSafetyDataFromServiceUsingSpecifiedLatitudeAndLongitudeForAuthenticatedUser() throws
                                                                                                                     Exception {
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

    @WithMockUser
    @Test
    void getReportOfSafetyAltitudeLevelPassesLanguageToReportServiceForReportGenerationForAUthenticatedUser() throws
                                                                                                              Exception {
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
