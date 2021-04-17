import { Grid, Typography } from "@material-ui/core";
import React, { useContext, useMemo } from "react";
import { DataContext } from "../../context/DataProvider";
import { COST_PER_CREDIT, currencyFormatter } from "../../helpers/helpers";
import TableComponent from "../TableComponent";
import CreditCardForm from "./CreditCardForm";

export default function Tuition() {
    const { userCourses } = useContext(DataContext);

    const columns = useMemo(
        () => [
            { accessor: "courseNumber" },
            { accessor: "courseName" },
            { accessor: "creditHours" },
            {
                header: "Cost",
                accessor: c =>
                    currencyFormatter.format(c.creditHours * COST_PER_CREDIT)
            }
        ],
        []
    );

    const totalCost = useMemo(() =>
        currencyFormatter.format(
            userCourses.reduce(
                (total, { creditHours }) =>
                    total + creditHours * COST_PER_CREDIT,
                0
            )
        )
    );

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <TableComponent columns={columns} rows={userCourses} />
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
