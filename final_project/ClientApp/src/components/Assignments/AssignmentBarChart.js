import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "../../context/AuthProvider";

export default function AssignmentBarChart({ assignment, receivedScore }) {
    const { authHeader } = useContext(AuthContext);

    const [stats, setStats] = useState({});

    useEffect(() => {
        if (assignment?.assignmentId) {
            axios
                .get(
                    `api/assignments/${assignment.assignmentId}/scores`,
                    authHeader
                )
                .then(res => {
                    setStats(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [assignment]);

    const { high, low, average } = stats;

    const data = {
        labels: ["High", "Low", "Average", "Me"],
        datasets: [
            {
                label: "Score",
                data: [high, low, average, receivedScore],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: assignment.maxPoints
                            ? assignment.maxPoints
                            : undefined
                    }
                }
            ]
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h6">Class Scores</Typography>
            <Bar data={data} options={options} />
        </div>
    );
}
