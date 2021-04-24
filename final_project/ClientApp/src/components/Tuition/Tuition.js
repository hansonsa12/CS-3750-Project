import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import _ from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {
    COST_PER_CREDIT,
    currencyFormatter,
    getFormattedDateTime
} from "../../helpers/helpers";
import TableComponent from "../TableComponent";
import CreditCardForm from "./CreditCardForm";

export default function Tuition() {
    const [transactions, setTransactions] = useState([]);
    const { authHeader } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get("api/transactions", authHeader)
            .then(res => {
                setTransactions(res.data);
            })
            .catch(err => {
                alert("something went wrong");
            });
    }, [authHeader]);

    const columns = useMemo(
        () => [
            {
                header: "Type",
                accessor: t => _.startCase(t.type)
            },
            {
                header: "Date",
                accessor: t => getFormattedDateTime(t.createdAt)
            },
            {
                accessor: "description"
            },
            {
                header: "Amount",
                accessor: t => currencyFormatter.format(t.amountInCents / 100)
            }
        ],
        []
    );

    const totalCost = useMemo(
        () =>
            currencyFormatter.format(
                transactions.reduce(
                    (total, { amountInCents }) => total + amountInCents,
                    0
                ) / 100
            ),
        [transactions]
    );

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <TableComponent columns={columns} rows={transactions} />
            </Grid>
            <Grid item style={{ marginRight: 10 }}>
                <Typography variant="h6">Balance Due: {totalCost}</Typography>
            </Grid>
            <Grid item>
                <CreditCardForm />
            </Grid>
        </Grid>
    );
}
