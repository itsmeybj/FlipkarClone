import { Grid, styled } from "@mui/material";
import React from "react";

import { imageURL } from '../constants/data'

const GridComponent = styled(Grid)`
    margin-top:10px;
`
const MidSection = () => {
    return (
        <GridComponent container lg={12} sm={12} md={12} xs={12}>
            {
                imageURL.map(item =>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                    <img src={item} alt="section" style={{ width: "100%" }} />
                    </Grid>
                )
            }
        </GridComponent>
    )
}

export default MidSection;