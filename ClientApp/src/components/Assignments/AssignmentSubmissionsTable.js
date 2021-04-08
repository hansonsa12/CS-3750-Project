import { Button } from "@material-ui/core";
import React, { useMemo } from "react";
import { getFormattedDateTime } from "../../helpers/helpers";
import TableComponent from "../TableComponent";

export default function AssignmentSubmissionsTable({ rows }) {
    const columns = useMemo(() => [
        {
            accessor: "studentId"
        },
        { accessor: "submission" },
        {
            header: "Submitted At",
            accessor: s => getFormattedDateTime(s.submittedAt)
        },
        {
            header: "Score",
            accessor: s => s.receivedScore || "-",
            alignValues: "center"
        },
        {
            header: "Action",
            accessor: s => (
                <Button color="primary" variant="contained">
                    Grade
                </Button>
            )
        }
    ]);
    return <TableComponent columns={columns} rows={rows} />;
}
