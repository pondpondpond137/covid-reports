"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./uploadSection.module.css";
import Papa from "papaparse";
import { useSession } from "next-auth/react";

function UploadSection() {
    const { data: session } = useSession();
    const [csvData, setCsvData] = useState([]); // State for storing CSV data
    const [isDataUploaded, setIsDataUploaded] = useState(false); // State to track upload status
    const fileInputRef = useRef(null); // Create a ref for the file input
    const [loading, setLoading] = useState(false); // Loading state
    const [message, setMessage] = useState(""); // Message state for feedback

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: false,
                complete: (results) => {
                    setCsvData(results.data); // Store the parsed CSV data
                    setIsDataUploaded(true); // Set upload status to true
                    setMessage(""); // Reset any previous message
                    console.log("Parsed CSV Data:", results.data);
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error);
                },
            });
        }
    };
    const handleCancelUpload = () => {
        setCsvData([]); // Clear the uploaded data
        setIsDataUploaded(false); // Reset upload status
        setMessage("");
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Reset file input
        }
    };

    const handleInsertToDatabase = async () => {
        setLoading(true); // Set loading to true
        setMessage(""); // Reset any previous message
        if (csvData.length === 0) {
            console.error("No data to insert");
            return; // Exit if there's no data to insert
        }

        try {
            const response = await fetch('https://database-final-project-7q1q.onrender.com/api/upload-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(csvData), // Send CSV data as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to insert data');
            }

            setMessage("Data inserted successfully!"); // Success message
            alert("Data inserted successfully!");
            handleCancelUpload(); // Optionally clear the upload after successful insertion
        } catch (error) {
            console.error('Error inserting data to database:', error);
            setMessage("Error inserting data. Please try again."); // Error message
            alert("Data inserted successfully!");
        } finally {
            setLoading(false); // Reset loading state
        }
    };


    return (
        <div className={styles.container}>
            {/* Upload file section */}
            <div className={styles.uploadSection}>
                <h3 className={styles.uploadHeader}>Upload CSV File</h3>
                {session && <input
                    type="file"
                    accept=".csv"
                    className={styles.uploadInput}
                    onChange={handleFileChange}
                    ref={fileInputRef} // Attach the ref here
                />}
            </div>

            {!session && (
                <p className={styles.loginPrompt}>
                    Please <a href="/login" className={styles.loginLink}>log in</a> to upload a file.
                </p>
            )}
            {/* Section for Displaying Uploaded CSV Data in a Table */}
            <div className={styles.items_panel}>
                <h3 className={styles.header}>Uploaded CSV Data</h3>
                <div className={styles.uploadButtons}>
                    {isDataUploaded && (
                        <>
                            <button
                                className={styles.cancelButton}
                                onClick={handleCancelUpload}
                            >
                                Cancel Upload
                            </button>
                            <button
                                className={styles.insertButton}
                                onClick={handleInsertToDatabase}
                            >
                                Insert to Database
                            </button>
                        </>
                    )}
                </div>


                {loading && <p className={styles.loadingMessage}>Inserting data, please wait...</p>}

                {message && <p className={styles.message}>{message}</p>}


                {csvData.length > 0 ? (
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Date</th>
                                <th>County</th>
                                <th>State</th>
                                <th>FIPS</th>
                                <th>Cases</th>
                                <th>Deaths</th>
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.index}</td>
                                    <td>{row.date}</td>
                                    <td>{row.county}</td>
                                    <td>{row.state}</td>
                                    <td>{String(row.fips)}</td>
                                    <td>{row.cases}</td>
                                    <td>{row.deaths}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.context}>No data uploaded yet.</p>
                )}
            </div>
        </div>
    );
}

export default UploadSection;
