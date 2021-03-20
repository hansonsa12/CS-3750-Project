import React from 'react';
import CourseTable from "./CourseTable";

export default function Courses({
    courses = []
}) {

    return (
        <div>
            <CourseTable courses={courses} />
        </div>

    )

}