import { Card, CardContent, Grid } from "@material-ui/core";
import _ from "lodash";
import React from "react";

export default function DetailsContainer({
    object = {},
    omitProperties = [],
    specialFormatters = {}
}) {
    return (
        <Card style={{ width: "100%" }}>
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
                        .difference(omitProperties)
                        .map(key => (
                            <Grid
                                item
                                container
                                spacing={2}
                                style={{ maxWidth: 800 }}
                            >
                                <Grid item>
                                    <strong>{_.startCase(key)}</strong>
                                </Grid>
                                <Grid item>
                                    {typeof specialFormatters[key] ===
                                    "function"
                                        ? specialFormatters[key](object)
                                        : object[key] || "n/a"}
                                </Grid>
                            </Grid>
                        ))
                        .value()}
                </Grid>
            </CardContent>
        </Card>
    );
}
