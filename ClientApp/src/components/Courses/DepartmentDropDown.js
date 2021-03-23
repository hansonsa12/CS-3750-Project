import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {
    MenuItem,
} from "@material-ui/core";
import { DEPARTMENTS } from '../../helpers/constants';

export default function DepartmentDropDown() {
    const [department, setDepartment] = React.useState('');

    const handleChange = (event) => {
        setDepartment(event.target.value);
    };
    return (
        <div>
            <InputLabel id="label">Department</InputLabel>
            <Select
                labelId="label"
                id="select"
                value={department}
                onChange={handleChange}
                style={{ width: 200 }}
            >
                {DEPARTMENTS.map((option, index) => (
                    <MenuItem key={`departmentOption-${index}`} value={index}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}
