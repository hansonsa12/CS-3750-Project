import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import React from "react";

const StyledTableCell = withStyles(theme => ({
    head: {
        fontWeight: "bold"
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: "rgb(245,245,255)"
        }
    }
}))(TableRow);

export default function TableComponent({
    rows = [],
    columns = [],
    emptyMessage = "No rows"
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <StyledTableCell
                                key={`th-${column.header}`}
                                align={column.alignValues || "left"}
                            >
                                {column.header ||
                                    (typeof column.accessor === "string" &&
                                        _.startCase(column.accessor))}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row, rIndex) => (
                            <StyledTableRow key={`row-${rIndex}`}>
                                {columns.map((column, cIndex) => {
                                    let cellValue = null;
                                    switch (typeof column.accessor) {
                                        case "string":
                                            cellValue = row[column.accessor];
                                            break;
                                        case "function":
                                            cellValue = column.accessor(row);
                                            break;
                                        default:
                                            break;
                                    }
                                    return (
                                        <StyledTableCell
                                            key={`cell-${rIndex}-${cIndex}-${cellValue}`}
                                            align={column.alignValues || "left"}
                                        >
                                            {cellValue ? cellValue : "n/a"}
                                        </StyledTableCell>
                                    );
                                })}
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell colSpan={8} align="center">
                                {emptyMessage}
                            </StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
