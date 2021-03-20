import { Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { TextEntryItem } from '../FormComponents';


export const LinkForm = (props) => {
    return (
        <FieldArray name="profileLinks">
            {({ fields }) => (
                <Grid item container alignItems="center" justify="center" spacing={1} xs={12}>
                    {fields.length > 0 ? (
                        fields.map((name, index) => (
                        <Fragment key={`profileLink-${name}-${index}`}>
                            <TextEntryItem
                                name={`${name}.title`} sm={4}
                            />
                            <TextEntryItem
                                name={`${name}.link`} sm={7}
                                required
                            />
                            <Grid item sm={1}>
                                <IconButton
                                    size="small"
                                    onClick={() => fields.remove(index)}
                                >
                                    <Close fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Fragment>
                    ))) : <Grid item>No links have been added. Click the plus button to add some.</Grid>}
                </Grid>
            )}
        </FieldArray>
    );
};
