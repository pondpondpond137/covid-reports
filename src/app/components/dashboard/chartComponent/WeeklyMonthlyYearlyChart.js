"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import styles from "./WeeklyMonthlyYearlyChart.module.css";

function WeeklyMonthlyYearlyChart() {
    const [timeFrame, setTimeFrame] = useState("weekly");
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Cases",
                data: [],
                borderColor: "#0000",
                fill: false,
                tension: 0.1,
            },
            {
                label: "Deaths",
                data: [],
                borderColor: "#ff6347",
                fill: false,
                tension: 0.1,
            },
        ],
    });
    const [comparisonPercentage, setComparisonPercentage] = useState({ cases: 0, deaths: 0 });

    const fetchData = async (timeFrame) => {
        const data = {
            cases: [100, 150, 130, 180, 220, 200],
            deaths: [10, 20, 15, 25, 30, 28],
            lastYearCases: [80, 140, 120, 160, 200, 180],
            lastYearDeaths: [5, 15, 10, 20, 25, 22],
        };

        calculateComparison(data);

        setChartData((prevData) => ({
            ...prevData,
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
            datasets: [
                { ...prevData.datasets[0], data: data.cases },
                { ...prevData.datasets[1], data: data.deaths },
            ],
        }));
    };

    const calculateComparison = (data) => {
        const casesDifference = ((data.cases.slice(-1)[0] - data.lastYearCases.slice(-1)[0]) / data.lastYearCases.slice(-1)[0]) * 100;
        const deathsDifference = ((data.deaths.slice(-1)[0] - data.lastYearDeaths.slice(-1)[0]) / data.lastYearDeaths.slice(-1)[0]) * 100;
        setComparisonPercentage({
            cases: casesDifference.toFixed(2),
            deaths: deathsDifference.toFixed(2),
        });
    };

    useEffect(() => {
        fetchData(timeFrame);
    }, [timeFrame]);

    return (
        <div className={styles.chartContainer}>
            <h3>COVID-19 Cases and Deaths ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h3>
            <div className={styles.timeframeButtons}>
                {["weekly", "monthly", "yearly"].map((frame) => (
                    <button
                        key={frame}
                        onClick={() => setTimeFrame(frame)}
                        className={timeFrame === frame ? styles.activeButton : ""}
                    >
                        {frame.charAt(0).toUpperCase() + frame.slice(1)}
                    </button>
                ))}
            </div>
            <Line data={chartData} height={50} />
            <div className={styles.comparison}>
                <p>Cases Compared to Last Year: {comparisonPercentage.cases}%</p>
                <p>Deaths Compared to Last Year: {comparisonPercentage.deaths}%</p>
            </div>
        </div>
    );
}

export default WeeklyMonthlyYearlyChart;
