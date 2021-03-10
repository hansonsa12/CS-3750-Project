import React, { Component } from 'react'
import CourseForm from "./CourseForm";

export class Courses extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <div>
                <CourseForm />
            </div>
        )
    }
}

export default Courses;