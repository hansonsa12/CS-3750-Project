import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputAdornment
} from "@material-ui/core";
import React from "react";
import { Form as FForm } from "react-final-form";
import {
    DateTimeEntryItem,
    SectionHeaderItem,
    TextEntryItem
} from "../FormComponents";

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

  return (
    <div>
      <Button onClick={handleClickOpen}>Make A Payment</Button>
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
                  <TextEntryItem
                    type="number"
                    name="amount"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    required={true}
                    sm={4}
                  />
                  <TextEntryItem
                    name="cardNumber"
                    required={true}
                    sm={8}
                    inputProps={{ pattern: "[\d| ]{16,22}" }}
                  />
                  <TextEntryItem name="cardName" label="Name on Card" required={true} sm={12} />
                  <DateTimeEntryItem name="expDate" label="MM/YY" sm={6} required={true} 
                    views={["year", "month"]}
                    format="MM/yy"
                    mask="__/__"
                    placeholder={"MM/YY"} 
                  />
                  <TextEntryItem name="cvc" label="CVC" sm={6} required={true} type="number" />
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
