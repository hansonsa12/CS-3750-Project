import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { getFormattedTime } from '../../helpers/constants'

export default function CourseCard({
    courseId,
    courseNumber,
    courseName,
    instructorName,
    roomNumber,
    startTime,
    endTime
}) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" color="textPrimary" gutterBottom>
                    <Link to={`courses/${courseId}/details`}>{courseNumber} {courseName}</Link>
                </Typography>
                <Typography>{instructorName}</Typography>
                <Typography>{roomNumber}</Typography>
                <Typography>{getFormattedTime(startTime, endTime)}</Typography>
            </CardContent>
        </Card>
    )
}
