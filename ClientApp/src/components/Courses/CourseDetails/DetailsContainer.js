import { Card, CardContent, Grid } from "@material-ui/core";
import _ from "lodash";
import React from "react";

export default function DetailsContainer({
    object = {},
    omitValues = [],
    specialFormatters = {},
}) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    {_.chain(object)
                        .keys()
                        .difference(omitValues)
                        .map(key => (
                            <>
                                <Grid
                                    key={`prop-label-${key}`}
                                    item
                                    xs={2}
                                    justify="flex-end"
                                    container
                                    style={{ maxWidth: 200 }}
                                >
                                    <strong>{_.startCase(key)}</strong>
                                </Grid>
                                <Grid
                                    key={`prop-value-${object[key]}`}
                                    item
                                    xs={10}
                                >
                                    {typeof specialFormatters[key] ===
                                    "function"
                                        ? specialFormatters[key](object[key])
                                        : object[key]}
                                </Grid>
                            </>
                        ))
                        .value()}
                </Grid>
            </CardContent>
        </Card>
    );
}
