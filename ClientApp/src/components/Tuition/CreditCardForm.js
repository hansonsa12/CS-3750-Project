import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment,
    Typography
} from "@material-ui/core";
import React from "react";
import { Form as FForm } from "react-final-form";
import {
    DateEntryItem,
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";
import * as Yup from "yup";
import { testCreditCard } from "../../helpers/helpers";
import { makeValidate } from "mui-rff";

export default function CreditCardForm(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = values => {
        alert(JSON.stringify(values));
    };

    const validationSchema = Yup.object().shape({
        amount: Yup.number().required("Payment amount is required")
    });

    const validate = makeValidate(validationSchema);

    return (
        <div>
            <Button onClick={handleClickOpen}>Make A Payment</Button>
            <FForm
                onSubmit={onSubmit}
                initialValues={testCreditCard}
                validate={validate}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">
                                Make A Payment
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={2} justify="center">
                                    <SectionHeaderItem
                                        top
                                        title="Credit Card Information"
                                    />
                                    <TextEntryItem
                                        name="cardNumber"
                                        required={true}
                                        sm={6}
                                        inputProps={{ pattern: "[d| ]{16,22}" }}
                                    />
                                    <TextEntryItem
                                        name="nameOnCard"
                                        label="Name on Card"
                                        required={true}
                                        sm={6}
                                    />
                                    <DateEntryItem
                                        name="expDate"
                                        label="MM/YY"
                                        sm={6}
                                        required={true}
                                        views={["year", "month"]}
                                        format="MM/yy"
                                        mask="__/__"
                                        placeholder={"MM/YY"}
                                    />
                                    <TextEntryItem
                                        name="cvc"
                                        label="CVC"
                                        sm={6}
                                        required={true}
                                        type="number"
                                    />
                                    <SectionHeaderItem />
                                    <Grid item>
                                        <Typography variant="h6">
                                            Payment:
                                        </Typography>
                                    </Grid>
                                    <TextEntryItem
                                        type="number"
                                        name="amount"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            )
                                        }}
                                        required={true}
                                        sm={4}
                                        leftLabel="Payment"
                                    />
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
