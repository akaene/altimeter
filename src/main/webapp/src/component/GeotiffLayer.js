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
import React from "react";
import { withLeaflet, MapLayer } from "react-leaflet";
import L from "leaflet";


import "leaflet-geotiff"
import "leaflet-geotiff/leaflet-geotiff-plotty"
import "leaflet-geotiff/leaflet-geotiff-vector-arrows"

class GeotiffLayer extends MapLayer {
    createLeafletElement(props) {
        const { url, options } = props;
        return L.leafletGeotiff(url, options);
    }

    componentDidMount() {
        const { map } = this.props.leaflet;
        this.leafletElement.addTo(map);
    }
}

export const PlottyGeotiffLayer = withLeaflet(props => {
    const { options, layerRef } = props;
    options.renderer = new L.LeafletGeotiff.Plotty(options);
    return <GeotiffLayer ref={layerRef} {...props} />;
});

export const VectorArrowsGeotiffLayer = withLeaflet(props => {
    const { options, layerRef } = props;
    options.renderer = new L.LeafletGeotiff.VectorArrows(options);
    return <GeotiffLayer ref={layerRef} {...props} />;
});

export default GeotiffLayer;
