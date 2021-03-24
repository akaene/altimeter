import React, {createRef} from "react";
import {connect} from "react-redux";
import {Map as LeafletMap, Marker, TileLayer, WMSTileLayer} from "react-leaflet";
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
        const position = [this.props.lat, this.props.long];
        return <LeafletMap ref={this.mapRef} center={position} zoom={this.state.zoom} onClick={this.onClick}
                           onZoomEnd={this.onZoomChange} className="crosshair-cursor-enabled">
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.displayCadastralMap &&
            <WMSTileLayer attribution='&amp;copy <a href="http://www.cuzk.cz">ČÚZK</a>' layers="CP.CadastralParcel"
                          opacity={0.25} url="http://services.cuzk.cz/wms/inspire-cp-wms.asp?"/>}
            <Marker position={position}/>
        </LeafletMap>;
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
