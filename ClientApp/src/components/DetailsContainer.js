import { Card, CardContent, Grid } from "@material-ui/core";
import _ from "lodash";
import React from "react";

export default function DetailsContainer({
    object = {},
    omitValues = [],
    specialFormatters = {}
}) {
    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-start"
                    justify="flex-start"
                    spacing={2}
                >
                    {_.chain(object)
                        .keys()
                        .difference(omitValues)
                        .map(key => (
                            <Grid
                                item
                                container
                                spacing={2}
                                style={{ maxWidth: 800 }}
                            >
                                <Grid
                                    item
                                    xs={4}
                                    sm={3}
                                    style={{ textAlign: "right" }}
                                >
                                    <strong>{_.startCase(key)}</strong>
                                </Grid>
                                <Grid item xs={8} sm={9}>
                                    {typeof specialFormatters[key] ===
                                    "function"
                                        ? specialFormatters[key](object[key])
                                        : object[key]}
                                </Grid>
                            </Grid>
                        ))
                        .value()}
                </Grid>
            </CardContent>
        </Card>
    );
}
