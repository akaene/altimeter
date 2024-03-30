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
import React, {createRef} from "react";
import {connect} from "react-redux";
import {MapContainer, Marker, TileLayer, useMapEvents, WMSTileLayer} from "react-leaflet";
import "./Map.scss";
import Constants from "../util/Constants";
import {updatePosition} from "../action/SyncActions";

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoom: Constants.INITIAL_MAP_ZOOM
        };
        this.mapRef = createRef();
    }

    onClick = (e) => {
        this.props.updatePosition(e.latlng.lat, e.latlng.lng);
    };

    onZoomChange = (e) => {
        this.setState({zoom: e.zoom});
    };

    render() {
        const me = this;
        function ClickHandler() {
            useMapEvents({
                click: (e) => me.onClick(e)
            });
            return null;
        }

        const position = [this.props.lat, this.props.long];
        return <MapContainer ref={this.mapRef} center={position} zoom={this.state.zoom} onClick={this.onClick}
                           onZoomEnd={this.onZoomChange} className="crosshair-cursor-enabled">
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.displayCadastralMap &&
            <WMSTileLayer attribution='&amp;copy <a href="http://www.cuzk.cz">ČÚZK</a>' layers="CP.CadastralParcel"
                          opacity={0.25} url="http://services.cuzk.cz/wms/inspire-cp-wms.asp?"/>}
            <Marker position={position}/>
            <ClickHandler/>
        </MapContainer>;
    }
}

export default connect(state => ({
    lat: state.latitude,
    long: state.longitude,
    displayCadastralMap: state.cadastralMap
}), dispatch => {
    return {
        updatePosition: (lat, long) => dispatch(updatePosition(lat, long))
    };
})(Map);
