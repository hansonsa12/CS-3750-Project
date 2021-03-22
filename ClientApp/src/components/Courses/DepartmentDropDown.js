import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {
    MenuItem,
} from "@material-ui/core";

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
            >
              <MenuItem value={"CS"} >CS</MenuItem>
              <MenuItem value={"PHYS"}>PHYS</MenuItem>
              <MenuItem value={"ENGL"} >ENGL</MenuItem>
              <MenuItem value={"COMM"}>COMM</MenuItem>
              <MenuItem value={"MATH"} >MATH</MenuItem>
            </Select>
            </div>
        )
}
