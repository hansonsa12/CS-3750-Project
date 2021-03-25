import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                            <TableCell key={`th-${column.header}`} align="left">
                                {column.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ?
                        rows.map((row, rIndex) => (
                            <TableRow key={`row-${rIndex}`}>
                                {columns.map((column, cIndex) => {
                                    let cellValue = null;
                                    switch (typeof (column.accessor)) {
                                        case "string":
                                            cellValue = row[column.accessor];
                                            break;
                                        case "function":
                                            cellValue = column.accessor(row);
                                            break;
                                    }
                                    return (
                                        <TableCell key={`cell-${rIndex}-${cIndex}-${cellValue}`} align="left">
                                            {cellValue}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>)) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">{emptyMessage}</TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}