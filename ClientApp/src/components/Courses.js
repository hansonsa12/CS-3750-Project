import { withStyles } from '@material-ui/core'
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

export default withStyles(styles)(Courses);