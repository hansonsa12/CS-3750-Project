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
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import { makeValidate } from "mui-rff";
import React, { useState } from "react";
import { Form as FForm } from "react-final-form";
import * as Yup from "yup";
import { testCreditCard } from "../../helpers/helpers";
import AlertMessage from "../AlertMessage";
import {
    DateEntryItem,
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";

export default function CreditCardForm(props) {
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const encodedUrlFrom = (object, wrapper) =>
        _.chain(object)
            .map(
                (val, key) =>
                    `${
                        wrapper
                            ? `${wrapper}[${_.snakeCase(key)}]`
                            : _.snakeCase(key)
                    }=${val}`
            )
            .join("&")
            .value();

    const onSubmit = async ({
        cardNumber: number,
        expDate,
        cvc,
        nameOnCard,
        amount
    }) => {
        try {
            const expMonth = dayjs(expDate).format("M");
            const expYear = dayjs(expDate).format("YYYY");
            const description = `Tuition payment from ${nameOnCard} on ${dayjs().format(
                "M/D/YYYY @ h:mm A"
            )}`;

            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SK}`
                }
            };

            const {
                data: { id: source }
            } = await axios.post(
                "https://api.stripe.com/v1/tokens",
                encodedUrlFrom({ number, expMonth, expYear, cvc }, "card"),
                config
            );

            const res = await axios.post(
                "https://api.stripe.com/v1/charges",
                encodedUrlFrom({
                    amount: amount * 100,
                    currency: "usd",
                    source,
                    description
                }),
                config
            );

            handleClose();

            setAlertMessage(
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h6">Success!</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body">
                            {res.data.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <a href={res.data.receipt_url} target="_blank">
                            View Receipt
                        </a>
                    </Grid>
                </Grid>
            );
        } catch (err) {
            console.error(err);
            setAlertMessage(err.message);
        }
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
                                        minDate={new Date()}
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
            {alertMessage && (
                <AlertMessage
                    message={alertMessage}
                    onClose={() => setAlertMessage(null)}
                />
            )}
        </div>
    );
}
