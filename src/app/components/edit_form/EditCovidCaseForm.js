// EditCovidCaseForm.js
import React, { useState, useEffect } from 'react';
import styles from './EditCovidCaseForm.module.css'; // Create this CSS file for styling

const EditCovidCaseForm = ({ caseData, onClose, onSave }) => {
    const [cases, setCases] = useState(caseData.cases);
    const [deaths, setDeaths] = useState(caseData.deaths);
    const [date, setDate] = useState(caseData.date);

    useEffect(() => {
        // Initialize the form with the existing data
        setCases(caseData.cases);
        setDeaths(caseData.deaths);
        setDate(caseData.date);
    }, [caseData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the save function passed from the parent
        await onSave(caseData.id_case, { cases, deaths, date });
        onClose(); // Close the form after saving
    };

    return (
        <div className={styles.formContainer}>
            <h2>Edit COVID Case</h2>
            <form onSubmit={handleSubmit} className={styles.editForm}>
                <div>
                    <label>Cases:</label>
                    <input
                        type="number"
                        value={cases}
                        onChange={(e) => setCases(e.target.value)}
                    />
                </div>
                <div>
                    <label>Deaths:</label>
                    <input
                        type="number"
                        value={deaths}
                        onChange={(e) => setDeaths(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditCovidCaseForm;
