import { withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import CourseForm from "./CourseForm";

const styles = theme => ({
    root: {
        maxWidth: 400,
        margin: 'auto',
        padding: '10px 20px 20px 20px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        margin: '0px 0px 10px 0px',
    },
    buttons: {
        marginLeft: 'auto',
        '& > *': {
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(1),
        },
    },
});
export class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false
        }
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