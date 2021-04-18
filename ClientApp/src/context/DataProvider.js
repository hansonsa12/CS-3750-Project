// reference: https://www.youtube.com/watch?v=XuFDcZABiDQ
import axios from "axios";
import _ from "lodash";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
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
                lastName: undefined
            },
            department: undefined,
            creditHours: undefined,
            description: undefined,
            buildingName: undefined,
            roomNumber: undefined,
            meetingDays: undefined,
            startTime: undefined,
            endTime: undefined,
            maxCapacity: undefined
        }
    ]
};

// Create context
export const DataContext = createContext(initialState);

// Provider component
export default function DataProvider({ children }) {
    const { isInstructor, isStudent, authHeader, user } = useContext(
        AuthContext
    );

    const [loading, setLoading] = useState(true);

    const [courses, setCourses] = useState();
    const [registrations, setRegistrations] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCourses(await getCourses());
            setRegistrations(await getRegistrations());
            setAllCourses(await getAllCourses());
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setSubmissions(await getSubmissions());
        }
        fetchData();
    }, [user]);

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
    };

    const getSubmissions = async () => {
        if (user && isStudent) {
            const res = await axios.get(
                `api/users/${user.userId}/submissions`,
                authHeader
            );
            return res.data;
        }
    };

    const userCourses = isInstructor ? courses : registrations;

    const registeredCourseIds = useMemo(() => {
        // get array of registered course ids on initial component
        // load and if registrations array changes
        // https://reactjs.org/docs/hooks-reference.html#usecallback
        return _.map(userCourses, "courseId");
    }, [userCourses]);

    const studentAssignments = useMemo(() => {
        if (registeredCourseIds?.length && allCourses?.length) {
            return _.chain(registeredCourseIds)
                .map(id => allCourses.find(c => c.courseId === id))
                .flatMap(c =>
                    c.assignment?.map(a => ({
                        ...a,
                        courseNumber: c.courseNumber
                    }))
                )
                .compact()
                .value();
        }
    }, [registeredCourseIds, allCourses]);

    const instructorAssignments = useMemo(() => {
        if (userCourses?.length){
            return _.chain(userCourses)
                .flatMap(c =>
                    c.assignment?.map(a => ({
                        ...a,
                        courseNumber: c.courseNumber
                    }))
                )
                .value();
        }
    }, [userCourses]);

    return (
        !loading && (
            <DataContext.Provider
                value={{
                    userCourses,
                    setUserCourses: isInstructor
                        ? setCourses
                        : setRegistrations,
                    allCourses,
                    submissions,
                    registeredCourseIds,
                    assignments: isInstructor ? instructorAssignments : studentAssignments,
                    setSubmissions
                }}
            >
                {children}
            </DataContext.Provider>
        )
    );
}
