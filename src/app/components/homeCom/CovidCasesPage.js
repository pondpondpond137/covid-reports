"use client";

import React, { useState, useEffect } from 'react';
import styles from './CovidCasesPage.module.css'; // Create this CSS file for styling
import EditCovidCaseForm from '../edit_form/EditCovidCaseForm';

const CovidCasesPage = () => {
    const [cases, setCases] = useState([]);
    const [page, setPage] = useState(1); // Page counter for pagination
    const [loading, setLoading] = useState(false); // Loading state for "Load More" functionality
    const [editingCase, setEditingCase] = useState(null); // State to track the case being edited


    useEffect(() => {
        loadCases(); // Initial load
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Placeholder API call. Replace with your actual API endpoint.
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/covid_cases?page=${page}&limit=25`);
            const newCases = await response.json();
            setCases(newCases);
            console.log(newCases)
        } catch (error) {
            console.error('Error loading cases:', error);
        }
        setLoading(false);
    }

    const loadCases = async () => {
        setLoading(true);
        try {
            // Placeholder API call. Replace with your actual API endpoint.
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/covid_cases?page=${page}&limit=10`);
            const newCases = await response.json();
            setCases((prevCases) => [...prevCases, ...newCases]); // Append new cases
            setPage(page + 1); // Increment page for next load
        } catch (error) {
            console.error('Error loading cases:', error);
        }
        setLoading(false);
    };

    const handleEdit = (caseData) => {
        setEditingCase(caseData); // Set the case to be edited
    };

    const handleSave = async (id, updatedData) => {
        try {
            // Call your API to update the case
            await fetch(`https://database-final-project-7q1q.onrender.com/edit/covid_cases/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            // Reload cases after editing
            loadData();
        } catch (error) {
            console.error('Error updating case:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log(`Deleting record with ID: ${id}`);
        try {
            await fetch(`https://database-final-project-7q1q.onrender.com/delete_cases/${id}`, {
                method: "DELETE"
            });
            // Reload cases after deletion
            loadData();
        } catch (error) {
            console.error('Error loading cases:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Covid-19 Cases</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Country</th>
                        <th>Date</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((record, index) => (
                        <tr key={`${record.id}-${index}`}>
                            <td>{record.id_case}</td>
                            <td>{record.name}</td>
                            <td>{record.date}</td>
                            <td>{record.cases}</td>
                            <td>{record.deaths}</td>
                            <td>
                                <button onClick={() => handleEdit(record)} className={styles.editButton}>Edit</button>
                                <button onClick={() => handleDelete(record.id_case)} className={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.loadMoreContainer}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <button onClick={loadCases} className={styles.loadMoreButton}>Load More</button>
                )}
            </div>

            {editingCase && (
                <EditCovidCaseForm
                    caseData={editingCase}
                    onClose={() => setEditingCase(null)} // Close the form
                    onSave={handleSave} // Save changes
                />
            )}
        </div>
    );
};

export default CovidCasesPage;
