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
    const { isInstructor, authHeader } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCourses(await getCourses());
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

    return (
        !loading && (
            <DataContext.Provider
                value={{
                    courses,
                }}
            >
                {children}
            </DataContext.Provider>
        )
    );
}
