"use client";

import React, { useState, useEffect } from 'react';
import styles from './AddData.module.css'

const AddData = () => {
    const [date, setDate] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [cases, setCases] = useState('');
    const [fips, setFips] = useState('');
    const [deaths, setDeaths] = useState('');
    const [statesList, setStatesList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);

    // Fetch the list of states on component mount
    useEffect(() => {
        fetchStates();
    }, []);


    const fetchStates = async () => {
        // Replace with your API endpoint to fetch the list of states}
        const response = await fetch('https://database-final-project-7q1q.onrender.com/getState');
        const data = await response.json();
        // console.log("test", data);
        setStatesList(data[0]);
        // console.log("state list ", statesList);
    };

    const fetchCountries = async (selectedState) => {
        try {
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/countries?state=${selectedState}`);
            const data = await response.json();
            setCountriesList(data); // Directly set the entire data as countriesList
        } catch (error) {
            console.log(error);
        }
    };
    

    const fetchFips = async (selectedCountry, selectedState) => {
        try {
            const response = await fetch(`https://database-final-project-7q1q.onrender.com/api/getFips?country=${selectedCountry}&state=${selectedState}`);
            const data = await response.json();
            setFips(data[0].fips);
        }catch (error) {
            console.log(error);
        }
    }

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setState(selectedState);
        fetchCountries(selectedState); // Fetch countries for the selected state
    };

    const handleCountryChange = (e) => {
        const selectCountry = e.target.value;
        setCountry(selectCountry);
        fetchFips(selectCountry, state);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            date,
            state,
            fips,
            country,
            cases: parseInt(cases),
            deaths: parseInt(deaths),
        };
        
        const response = await fetch('https://database-final-project-7q1q.onrender.com/api/addData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert("Data added successfully!");
            // Reset the form
            setDate('');
            setState('');
            setCountry('');
            setCases('');
            setDeaths('');
            setCountriesList([]); // Clear countries list after submission
        } else {
            alert("Failed to add data.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Add COVID Data</h2>
            <form onSubmit={handleSubmit} className={styles.form_wraper}>
                <div className={styles.form_group}>
                    <label className={styles.label}>Date:</label>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        required 
                        className={styles.input_item}
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Select State:</label>
                    <select className={styles.input_item} value={state} onChange={handleStateChange} required>
                        <option value="">-- Select State --</option>
                        {statesList.map((state) => (
                            <option key={state.fips_state} value={state.name_state}>
                                {state.name_state}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Select Country:</label>
                    <select className={styles.input_item} value={country} onChange={handleCountryChange} required>
                        <option value="">-- Select Country --</option>
                        {countriesList.map((country) => (
                            <option key={country.fips} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Case Counts:</label>
                    <input
                        className={styles.input_item}
                        type="number" 
                        value={cases} 
                        onChange={(e) => setCases(e.target.value)} 
                        required 
                    />
                </div>

                <div className={styles.form_group}>
                    <label className={styles.label}>Death Counts:</label>
                    <input 
                        className={styles.input_item}
                        type="number" 
                        value={deaths} 
                        onChange={(e) => setDeaths(e.target.value)} 
                        required 
                    />
                </div>
                <div className={styles.btnWrap}>
                    <button type="submit" className={styles.submitBtn}>Submit</button>
                </div>
            </form>
        </div>
    );
};


export default AddData