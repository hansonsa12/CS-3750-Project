import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
} from "@material-ui/core";
import { DatePicker } from "mui-rff";
import React from "react";
import { Form as FForm } from "react-final-form";
import {ExpirationDateEntryItem, SectionHeaderItem, TextEntryItem } from "../FormComponents";


export default function CreditCardForm(props) {

    const [open, setOpen] = React.useState(false);

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        alert(JSON.stringify(values));
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Pay Balance</Button>
            <FForm onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Credit Card Form</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="space-between">
                                    <SectionHeaderItem top title="Credit Card Information" />
                                    <TextEntryItem name="Card Number" required={true} sm={8} />
                                    <TextEntryItem name="Card Name" required={true} sm={8} />
                                    <TextEntryItem name="Exp" sm={2} required={true} />
                                    <TextEntryItem name="CVC" sm={2} required={true} />
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
