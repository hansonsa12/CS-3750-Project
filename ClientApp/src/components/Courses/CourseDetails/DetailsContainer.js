import { Card, CardContent, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { Fragment } from "react";

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
                            <Fragment key={`prop-${key}`}>
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
                            </Fragment>
                        ))
                        .value()}
                </Grid>
            </CardContent>
        </Card>
    );
}
