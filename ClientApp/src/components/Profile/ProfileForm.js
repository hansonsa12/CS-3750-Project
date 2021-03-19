import {
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Divider,
    IconButton,
} from "@material-ui/core";

import React, { useContext } from "react";
import EditIcon from '@material-ui/icons/Edit';
import _ from "lodash";
import { Form as FForm } from "react-final-form";
import { showErrorOnBlur } from "mui-rff";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from '../../context/AuthProvider';
import axios from "axios";
import ProfilePicUploader from '../FileUploading/ProfilePicUploader';



export default function ProfileForm() {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: "none",
        },
    }));

    const classes = useStyles();


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { user } = useContext(AuthContext);
    const { authHeader } = useContext(AuthContext);

    const onSubmit = values => {
        var id = user.userId;
        alert(id);

        axios
            //.put("api/users/${user.userID}")
            //TODO: how to pass userInfo
            .put("api/users/UpdateUser", { user }, authHeader)
            .then(res => {
                this.setResponseToken(res);
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });

    }

    const TextEntry = (fieldProps) => (
        <Grid item xs={12} {..._.pick(fieldProps, ["sm"])}>
            <TextField
                size="small"
                label={_.startCase(fieldProps.name)}
                variant="outlined"
                showError={showErrorOnBlur}
                {..._.omit(fieldProps, ["sm"])}
            />
        </Grid>
    );

    const SectionHeader = (fieldProps) => (
        <Grid item xs={12}>
            <Typography style={fieldProps.style}>{fieldProps.title}</Typography>
            <Divider />
        </Grid>
    );


    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <FForm onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Edit Form</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <SectionHeader title="Profile Information" />
                                    <TextEntry name="phoneNumber" sm={6} />
                                    <TextEntry name="address1" sm={6} />
                                    <TextEntry name="address2" sm={6} />
                                    <TextEntry name="city" sm={6} />
                                    <TextEntry name="state" sm={6} />
                                    <TextEntry name="zipcode" sm={6} />
                                    <TextEntry name="link1" />
                                    <TextEntry name="link2" sm={6} />
                                    <TextEntry name="link3" sm={6} />
                                    <Grid item>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                component="span"
                                            >
                                                Upload
                    </Button>
                                        </label>
                                    </Grid>
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
