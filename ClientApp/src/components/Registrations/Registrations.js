import { Button, Grid } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Form as FForm } from "react-final-form";
import { DataContext } from "../../context/DataProvider";
import DepartmentDropDown from "../Courses/DepartmentDropDown";
import { TextEntryItem } from "../FormComponents";
import RegistrationsTable from "./RegistrationsTable";

export default function Registrations() {
    const { allCourses } = useContext(DataContext);

    const [filteredCourses, setFilteredCourses] = useState(undefined);

    useEffect(() => {
        // Initially load all courses once they are available
        if (!filteredCourses && allCourses) {
            setFilteredCourses(allCourses);
        }
    }, [allCourses]);

    const onSubmit = ({ department, titleKeyWords }) => {
        setFilteredCourses(
            allCourses.filter(c => {
                return (
                    (department === "Any" || c.department === department) &&
                    (!titleKeyWords ||
                        c.courseName.includes(titleKeyWords.trim()))
                );
            })
        );
    };

    return (
        <Grid container style={{ width: "100%" }} spacing={2}>
            <Grid item container xs={12} justify="center">
                <FForm
                    onSubmit={onSubmit}
                    initialValues={{
                        department: "Any"
                    }}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container style={{ width: 500 }} spacing={1}>
                                <DepartmentDropDown xs={4} enableAnyOption />
                                <TextEntryItem xs={6} name="titleKeyWords" />
                                <Grid item xs={2}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ height: "100%" }}
                                        type="submit"
                                    >
                                        <Search />
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </FForm>
            </Grid>
            <Grid item xs={12}>
                <RegistrationsTable rows={filteredCourses} />
            </Grid>
        </Grid>
    );
}
