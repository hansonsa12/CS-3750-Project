import { Card, CardContent, Divider, Grid } from "@material-ui/core";
import _ from "lodash";
import React from "react";

export default function DetailsContainer({
    object = {},
    omitProperties = [],
    specialFormatters = {},
    children
}) {
    return (
        <Card style={{ width: "100%" }}>
            <CardContent>
                <Grid container>
                    <Grid
                        item
                        xs={children ? 6 : 12}
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
                                    key={key}
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
                    {children && (
                        <>
                            <Grid item xs={1}>
                                <Divider orientation="vertical" />
                            </Grid>
                            <Grid item xs={5}>
                                {children}
                            </Grid>
                        </>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
}
