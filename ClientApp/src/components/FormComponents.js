import { Divider, Grid, Tooltip, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import _ from "lodash";
import {
    KeyboardDateTimePicker,
    KeyboardTimePicker,
    showErrorOnBlur,
    TextField,
} from "mui-rff";
import React from "react";

export const TextEntryItem = props => {
    const { name } = props;
    return (
        <Grid item xs={12} {...gridPropsFrom(props)}>
            <TextField
                size="small"
                label={getLabelFromName(name)}
                variant="outlined"
                showError={showErrorOnBlur}
                {...fieldPropsFrom(props)}
            />
        </Grid>
    );
};

export const TimeEntryItem = props => {
    const { name } = props;
    return (
        <Grid item xs={12} {...gridPropsFrom(props)}>
            <KeyboardTimePicker
                label={getLabelFromName(name)}
                variant="inline"
                ampm={true}
                inputVariant="outlined"
                size="small"
                mask="__:__ _M"
                placeholder="08:00 AM"
                {...fieldPropsFrom(props)}
            />
        </Grid>
    );
};

export const DateTimeEntryItem = props => {
    const { name } = props;
    return (
        <Grid item xs={12} {...gridPropsFrom(props)}>
            <KeyboardDateTimePicker
                label={getLabelFromName(name)}
                variant="inline"
                ampm={true}
                inputVariant="outlined"
                size="small"
                format="MM/dd/yyyy hh:mm a"
                mask="__/__/____ __:__ _M"
                placeholder={dayjs().format("MM/DD/YYYY hh:mm A")}
                {...fieldPropsFrom(props)}
            />
        </Grid>
    );
};

export const SectionHeaderItem = props => {
    const {
        top,
        style = top ? {} : { marginTop: 10 },
        title,
        action,
        actionTooltip,
    } = props;

    return (
        <Grid
            item
            container
            justify="space-between"
            alignItems="flex-end"
            xs={12}
            {...gridPropsFrom(props)}
        >
            <Grid item>
                <Typography style={style}>{title}</Typography>
            </Grid>
            <Grid item>
                {actionTooltip && (
                    <Tooltip
                        key={actionTooltip}
                        title={actionTooltip}
                        placement="left"
                    >
                        {action}
                    </Tooltip>
                )}
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    );
};

const gridPropNames = ["xs", "sm", "m"];

const gridPropsFrom = props => {
    return _.pick(props, gridPropNames);
};

const fieldPropsFrom = props => {
    return _.omit(props, gridPropNames);
};

const getLabelFromName = name => {
    return _.chain(name).split(".").last().startCase().value();
};
