import dayjs from 'dayjs';
import _ from 'lodash';

export const AccountType = {
    INSTRUCTOR: 'instructor',
    STUDENT: 'student'
};

export const getFormattedTime = (startTime, endTime) => {
    return _.chain([startTime, endTime]).compact().join(" - ").value();
};

export const getFormattedLocation = (building, room) => {
    return _.chain([building, room]).compact().join(", ").value();
};

export const getFormattedInstructorName = ({ lastName, firstName }) => {
    return _.chain([lastName, firstName]).compact().join(", ").value();
};

export const getFileUrl = (userId, fileName) => {
    return (userId && fileName) ? `/uploads/u${userId}/${fileName}` : null;
};

export const MAX_PROFILE_LINKS = 5;

export const AssignmentType = {
    FILE_UPLOAD: "File Upload",
    TEXT_ENTRY: "Text Entry"
};

export const ASSIGNMENT_TYPES = [...Object.values(AssignmentType)];
export const DEPARTMENTS = ["Computer Science", "Physics", "Math", "English", "Communications"];

export const getFormattedDueDate = (dueDate) => {
    return dueDate ? dayjs(dueDate).format("MM/DD/YYYY hh:mm A") : "n/a";
};