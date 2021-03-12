import React, { Component } from 'react'
import CourseForm from "./CourseForm";
import CourseTable from "./CourseTable";
export class Courses extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <div>
                <CourseForm/>
                <CourseTable />
            </div>
            
        )

    }
}
export default Courses;