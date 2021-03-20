import {
    Button,
    Dialog,
    DialogActions, DialogContent, DialogTitle, Grid,
    IconButton,
    Tooltip
} from "@material-ui/core";
import { Add, Edit } from '@material-ui/icons';
import axios from 'axios';
import arrayMutators from 'final-form-arrays';
import { makeValidate } from 'mui-rff';
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthProvider';
import { MAX_PROFILE_LINKS } from '../../helpers/constants';
import { SectionHeaderItem, TextEntryItem } from '../FormComponents';
import { LinkForm } from './LinkForm';

export default function ProfileForm() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { authHeader, user, updateUser } = useContext(AuthContext);

    const onSubmit = values => {
        axios
            .put("api/users", values, authHeader)
            .then(res => {
                updateUser(res.data);
                handleClose();
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });

    }

    const validationSchema = Yup.object().shape({
        profileLinks: Yup.array().of(Yup.object().shape({
            link: Yup.string().required("Link cannot be blank")
        }))
    });

    const validate = makeValidate(validationSchema);

    return (
        <div>
            <Tooltip title="Edit Profile" placement="right">
                <IconButton onClick={handleClickOpen}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <FForm
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={{
                    ...user,
                }}
                validate={validate}
            >
                {({ handleSubmit, form: { mutators: { push, pop } }, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <TextEntryItem name="biography" rows={6} multiline />
                                    <TextEntryItem name="phoneNumber" sm={6} />
                                    <SectionHeaderItem title="Links" action={
                                        <Tooltip title="Add Link" placement="left">
                                            <IconButton size="small" 
                                                onClick={() => { 
                                                    push('profileLinks', undefined)
                                                }}
                                                disabled={values.profileLinks.length >= MAX_PROFILE_LINKS}
                                            >
                                                <Add fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    }/>
                                    <LinkForm />
                                    {/* TODO Ky Add link field array */}
                                    <SectionHeaderItem title="Address" />
                                    <TextEntryItem name="address.addressOne" sm={6} />
                                    <TextEntryItem name="address.addressTwo" sm={6} />
                                    <TextEntryItem name="address.city" sm={6} />
                                    <TextEntryItem name="address.state" sm={6} />
                                    <TextEntryItem name="address.zipCode" sm={6} />
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                )}
            </FForm>
        </div>
    );
}
