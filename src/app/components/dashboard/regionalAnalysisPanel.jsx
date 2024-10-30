import React, { useEffect, useState } from 'react';
import styles from './RegionalAnalysisPanel.module.css';
import './regionalAnalysisPanel.css';

const RegionalAnalysisPanel = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-01-02');
    const [orderBy, setOrderBy] = useState('total_cases');
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, orderBy]);
    const fetchData = async () => {
        try {
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/regionalAnalysis?startDate=${startDate || '2020-01-01'}&endDate=${endDate || '2024-01-02'}&orderBy=${orderBy || 'total_cases'}`);
            // const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/regionalAnalysis?startDate=2020-01-01&endDate=2024-01-02&orderBy=total_deaths`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching regional analysis data:', error);
            setData([]);
        }
    };

    const formatNumber = (number) => {
        if (number !== undefined && Number.isFinite(number)) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return '0';
    };

    const filteredData = data.filter(item =>
        item.name_state.toLowerCase().includes(filterName.toLowerCase())
    );

    return (
        <div>
            <div className={styles.container}>
                <input
                    className={styles.dateInput}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    className={styles.dateInput}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <select
                    className={styles.selectedInput}
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                >
                    <option value="total_cases">Order by Total Cases</option>
                    <option value="total_deaths">Order by Total Deaths</option>
                </select>
                <input
                    className={styles.nameInput}
                    type="text"
                    placeholder="Filter by name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
            </div>
            <div className='tableContainer'>
                <h3 className={styles.header}>Regional Analysis</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Cases</th>
                            <th>Total Deaths</th>
                        </tr>
                    </thead>
                    <tbody className='table'>
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={`${item.id}-${index}`} onClick={() => console.log(`Drill down on ${item.name_state}`)}>
                                    <td>{item.name_state}</td>
                                    <td>{formatNumber(item.total_cases)}</td>
                                    <td>{formatNumber(item.total_deaths)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegionalAnalysisPanel;

