// reference: https://www.youtube.com/watch?v=XuFDcZABiDQ
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

const initialState = {
    courses: [
        {
            courseId: undefined,
            courseName: undefined,
            courseNumber: undefined,
            instructorId: undefined,
            instructor: {
                firstName: undefined,
                lastName: undefined,
            },
            department: undefined,
            creditHours: undefined,
            description: undefined,
            buildingName: undefined,
            roomNumber: undefined,
            meetingDays: undefined,
            startTime: undefined,
            endTime: undefined,
            maxCapacity: undefined,
        },
    ],
};

// Create context
export const DataContext = createContext(initialState);

// Provider component
export default function DataProvider({ children }) {
    const { isInstructor, isStudent, authHeader } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [courses, setCourses] = useState();
    const [registrations, setRegistrations] = useState([]);
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCourses(await getCourses());
            setRegistrations(await getRegistrations());
            setAllCourses(await getAllCourses());
            setLoading(false);
        }
        fetchData();
    }, []);

    const getCourses = async () => {
        if (isInstructor) {
            const res = await axios.get("api/courses", authHeader);
            return res.data;
        }
    };

    const getRegistrations = async () => {
        if (isStudent) {
            const res = await axios.get("api/registrations", authHeader);
            return res.data;
        }
    };

    const getAllCourses = async () => {
        if (isStudent) {
            const res = await axios.get("api/courses/all", authHeader);
            return res.data;
        }
    }

    return (
        !loading && (
            <DataContext.Provider
                value={{
                    userCourses: isInstructor ? courses : registrations,
                    setUserCourses: isInstructor ? setCourses : setRegistrations,
                    allCourses,
                }}
            >
                {children}
            </DataContext.Provider>
        )
    );
}
