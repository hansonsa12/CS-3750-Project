
import React from 'react'
import { TextField, KeyboardTimePicker, showErrorOnBlur } from "mui-rff";
import { Grid } from '@material-ui/core';
import _ from 'lodash';

export const TextEntryItem = (fieldProps) => {
    return (
        <Grid item xs={12} {..._.pick(fieldProps, ['sm'])}>
            <TextField size="small" label={_.startCase(fieldProps.name)}
                variant="outlined" showError={showErrorOnBlur}
                {..._.omit(fieldProps, ['sm'])}
            />
        </Grid>
    )
}

export const TimeEntryItem = (fieldProps) => (
    <Grid item xs={12} {..._.pick(fieldProps, ['sm'])}>
        <KeyboardTimePicker label={_.startCase(fieldProps.name)}
            variant="inline"
            ampm={true}
            inputVariant="outlined"
            size="small"
            mask="__:__ _M"
            placeholder="08:00 AM"
            {..._.omit(fieldProps, ['sm'])}
        />
    </Grid>
);
