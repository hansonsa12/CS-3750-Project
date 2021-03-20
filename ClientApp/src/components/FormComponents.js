
import {
    Divider, Grid,
    Typography
} from '@material-ui/core';
import _ from 'lodash';
import {
    KeyboardTimePicker,
    showErrorOnBlur, TextField
} from "mui-rff";
import React from 'react';

export const TextEntryItem = (props) => {
    const { name } = props;
    return (
        <Grid item xs={12} {...gridPropsFrom(props)}>
            <TextField size="small"
                label={getLabelFromName(name)}
                variant="outlined" showError={showErrorOnBlur}
                {...fieldPropsFrom(props)}
            />
        </Grid>
    )
};

export const TimeEntryItem = (props) => {
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

export const SectionHeaderItem = (props) => {
    const { 
        top,
        style = top ? {} : { marginTop: 10 }, 
        title 
    } = props;

    return (
        <Grid item xs={12} {...gridPropsFrom(props)}>
            <Typography style={style}>{title}</Typography>
            <Divider />
        </Grid>
    );
};

const gridPropNames = ['xs', 'sm', 'm'];

const gridPropsFrom = (props) => {
    return _.pick(props, gridPropNames);
};

const fieldPropsFrom = (props) => {
    return _.omit(props, gridPropNames);
};

const getLabelFromName = (name) => {
    return _.chain(name).split('.').last().startCase().value();
};
