import { MenuItem } from "@material-ui/core";
import React from "react";
import { DEPARTMENTS } from "../../helpers/constants";
import { TextEntryItem } from "../FormComponents";

export default function DepartmentDropDown({ enableAnyOption, ...rest }) {
    return (
        <TextEntryItem name="department" select {...rest}>
            {enableAnyOption && (
                <MenuItem key={`departmentOption-any`} value="Any">
                    Any
                </MenuItem>
            )}
            {DEPARTMENTS.map((option, index) => (
                <MenuItem key={`departmentOption-${index}`} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextEntryItem>
    );
}
