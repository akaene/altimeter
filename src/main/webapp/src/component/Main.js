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
import {Grid} from "@mui/material";
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
