import {
    Button,
    Dialog,
    DialogActions, DialogContent, DialogTitle, Grid,
    IconButton,
    Tooltip
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import React, { useContext } from "react";
import { Form as FForm } from "react-final-form";
import { AuthContext } from '../../context/AuthProvider';
import { SectionHeaderItem, TextEntryItem } from '../FormComponents';

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

    return (
        <div>
            <Tooltip title="Edit Profile" placement="right">
                <IconButton onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <FForm
                onSubmit={onSubmit}
                initialValues={{
                    ...user
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <SectionHeaderItem top title="Profile Information" />
                                    <TextEntryItem name="phoneNumber"/>
                                    <SectionHeaderItem title="Profile Links" />
                                    {/* TODO Add link field array */}
                                    {/* <TextEntryItem name="link1" sm={6}/>
                                    <TextEntryItem name="link2" sm={6} />
                                    <TextEntryItem name="link3" sm={6} />
                                    <TextEntryItem name="link3" sm={6} /> */}
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
