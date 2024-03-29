import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";

export const AccountType = {
    INSTRUCTOR: "instructor",
    STUDENT: "student"
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

export const getFileUrl = (userId, type, fileName) => {
    return userId && fileName
        ? `/uploads/u${userId}/${type}s/${fileName}`
        : null;
};

export const MAX_PROFILE_LINKS = 5;

export const AssignmentType = {
    FILE_UPLOAD: "File Upload",
    TEXT_ENTRY: "Text Entry"
};

export const COST_PER_CREDIT = 100;

export const ASSIGNMENT_TYPES = [...Object.values(AssignmentType)];
export const DEPARTMENTS = [
    "Computer Science",
    "Physics",
    "Math",
    "English",
    "Communications"
];

export const getFormattedDateTime = dueDate => {
    return dueDate ? dayjs(dueDate).format("MM/DD/YYYY hh:mm A") : "n/a";
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
    /* https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string */
    style: "currency",
    currency: "USD"
});

dayjs.extend(customParseFormat);
export const testCreditCard = {
    nameOnCard: "Test Card",
    cardNumber: "4242424242424242",
    expDate: dayjs("04/22", "MM/YY").format(),
    cvc: "314"
};

export const stripePublicKey =
    "pk_test_51IbtKZD8gKZEIEySSvvoF7Wn4ldzPK0fBfV91OchfcM9Oz8Fgk3HEJeSXdOdrsRrNBFo8z8yWqFwrUBxZx5TUMRs00mYyjCI2c";
