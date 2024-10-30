"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './trendsAnalysisPanel.module.css'

const TrendsAnalysisPanel = () => {
    const [data, setData] = useState([]); // Yearly data
    const [selectedYear, setSelectedYear] = useState(null); // State to hold the selected year
    const [monthlyData, setMonthlyData] = useState([]); // State to hold the monthly data

    useEffect(() => {
        fetchTrendsData();
    }, []);

    useEffect(() => {
        if (selectedYear) {
            fetchMonthlyData(selectedYear);
        }
    }, [selectedYear])

    const fetchTrendsData = async () => {
        try {
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/trendsAnalysis`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching trends analysis data:', error);
        }
    };

    const fetchMonthlyData = async (year) => {
        if (year) {
            try {
                setMonthlyData([]); // Clear monthly data before fetching new data
                const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/trendsAnalysis?year=${year}`);
                if (!response.ok) throw new Error('Failed to fetch monthly data');
                const result = await response.json();
                setMonthlyData(result);
            } catch (error) {
                console.error('Error fetching monthly data:', error);
            }
        }else {
            return
        }
    };

    const handleBarClick = (event, elements) => {
        if (elements.length > 0) {
            const yearClicked = data[elements[0].index].year;
            setSelectedYear(yearClicked); // Update the selected year
            fetchMonthlyData(yearClicked); // Fetch the monthly data for the selected year
        }
    };

    const handleBackClick = () => {
        setSelectedYear(null); // Reset selected year to close drill-down view
        setMonthlyData([]); // Clear monthly data
    };

    const chartData = {
        labels: data.map(item => item.year),
        datasets: [
            {
                label: 'Total Cases',
                data: data.map(item => item.total_cases),
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total Deaths',
                data: data.map(item => item.total_deaths),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const monthlyChartData = {
        labels: monthlyData.map(month => month.month),
        datasets: [
            {
                label: 'Total Cases',
                data: monthlyData.map(month => month.total_cases),
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total Deaths',
                data: monthlyData.map(month => month.total_deaths),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        onClick: handleBarClick,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const monthlyChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.mainWrap}>
            <div className={styles.container}>
                <h3 className={styles.header}>Trends Analysis</h3>
                <div className={styles.barWrap}>
                    <Bar data={chartData} options={chartOptions} /> {/* Yearly Bar chart */}
                </div>
            </div>

            {selectedYear && (
                <div className={styles.container}>
                    <h4>Monthly Data for {selectedYear}</h4>
                    <button onClick={handleBackClick} className={styles.backButton}>Back</button> {/* Back button */}
                    <div className={styles.barWrap}>
                        <Bar data={monthlyChartData} options={monthlyChartOptions} /> {/* Monthly Bar chart */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrendsAnalysisPanel;
