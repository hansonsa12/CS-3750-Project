import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { getFormattedTime } from '../../helpers/constants'

export default function CourseCard({
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
                    {courseNumber} {courseName}
                </Typography>
                <Typography>{instructorName}</Typography>
                <Typography>{roomNumber}</Typography>
                <Typography>{getFormattedTime(startTime, endTime)}</Typography>
            </CardContent>
        </Card>
    )
}
