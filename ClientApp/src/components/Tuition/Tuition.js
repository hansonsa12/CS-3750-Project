import React from 'react'
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreditCardForm from './CreditCardForm';

export default function Tuition () {

    return (
        <div>
             <TableContainer component={Paper}>
             <TableHead>
                    <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="right">Balance</TableCell>
                    </TableRow>
                </TableHead>
             </TableContainer>
             <CreditCardForm />

             
        </div>
    )
}
