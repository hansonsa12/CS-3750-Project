import _ from 'lodash';

export const AccountType = {
    INSTRUCTOR: 'instructor',
    STUDENT: 'student'
};

export const getFormattedTime = (startTime, endTime) => {
    return _.chain([startTime, endTime]).compact().join(" - ").value();
};

export const getFileUrl = (userId, fileName) => {
    return (userId && fileName) ? `/uploads/u${userId}/${fileName}` : null;
};

export const MAX_PROFILE_LINKS = 5;

export const DEPARTMENTS = ["Computer Science", "Physics", "Math", "English", "Communications"];