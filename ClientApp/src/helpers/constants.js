import _ from 'lodash';

export const AccountType = {
    INSTRUCTOR: 'instructor',
    STUDENT: 'student'
};

export const getFormattedTime = (startTime, endTime) => {
    return _.chain([startTime, endTime]).compact().join(" - ").value();
};