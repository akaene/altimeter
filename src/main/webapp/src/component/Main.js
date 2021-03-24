import React from "react";
import {Grid} from "@material-ui/core";
import Map from "./Map";
import DataPane from "./DataPane";

const Main = () => {
    return <div>
        <main className="content">
            <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={8}>
                    <Map/>
                </Grid>
                <Grid item xs={4}>
                    <DataPane/>
                </Grid>
            </Grid>
        </main>
    </div>;
}

export default Main;
