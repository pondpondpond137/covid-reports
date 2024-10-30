"use client";
import React, { useState, useEffect } from "react";
import styles from './summaryPanel.module.css'; // Adjust your styles path
import Papa from 'papaparse'; // Importing the PapaParse library
import { useSession } from "next-auth/react";
import AddData from "./insertPage/addData";

function SummaryPanel() {
  const [summaryData, setSummaryData] = useState({
    "total_cases": 0,
    "total_deaths": 0,
    "most_country": "",
    "most_state": ""
  });
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]); // State for storing CSV data

  const { data: session } = useSession();

  const formatNumber = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return null
};

  const fetchCovidSummary = async () => {
    try {
      const res = await fetch("https://database-final-project-7q1q.onrender.com/getCovidSum");
      if (!res.ok) throw new Error("Network response was not ok");
      // Access the first element if the response is an array
      const data = await res.json();
      const total_cases = data.totalCaseDeath[0].total_cases;
      const total_deaths = data.totalCaseDeath[0].total_deaths;
      const most_country = data.mostCountry[0];
      const most_state = data.mostState[0];
      setSummaryData({
        "total_cases": total_cases,
        "total_deaths": total_deaths,
        "most_country": most_country,
        "most_state": most_state
      })
      setLoading(false);
    } catch (error) {
      console.error("Error fetching COVID-19 summary:", error);
    }
  };

  useEffect(() => {
    fetchCovidSummary();
  }, []);


  return (
    <>
      <div className={styles.main}>
      <h2>COVID-19 Summary Statistics</h2>
        <div className={styles.container}>
          <div className={styles.items_panel}>
            <h3 className={styles.header}>Total Cases</h3>
            <p className={styles.context}>
              {formatNumber(summaryData.total_cases)}
            </p>
            <br/>
            <br/>
          </div>
          <div className={styles.items_panel}>
            <h3 className={styles.header}>Total Deaths</h3>
            <p className={styles.context}>
              {formatNumber(summaryData.total_deaths)}
            </p>
          </div>
          <div className={styles.items_panel}>
            {summaryData.most_country && (
              <div>
                <h3 className={styles.header}>Most Affected Country</h3>
                <p className={styles.context}>
                  {summaryData.most_country.name}
                </p>
                <p className={styles.context}>
                  Cases: {formatNumber(summaryData.most_country.total_cases)}
                </p>
                <p className={styles.context}>
                  Deaths: {formatNumber(summaryData.most_country.total_deaths)}
                </p>
              </div>
            )}
          </div>
          <div className={styles.items_panel}>
            {summaryData.most_state && (
              <div>
                <h3 className={styles.header}>Most Affected State</h3>
                <p className={styles.context}>{summaryData.most_state.name}</p>
                <p className={styles.context}>
                  Cases: {formatNumber(summaryData.most_state.total_cases)}
                </p>
                <p className={styles.context}>
                  Deaths: {formatNumber(summaryData.most_state.total_deaths)}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* <button className="btn-summary" onClick={console.log(summaryData)}>Test</button> */}
        <AddData />
      </div>
    </>
  );
}

export default SummaryPanel;
