'use client';

import { useState, useEffect } from 'react';

export default function Home() {
    const [states, setStates] = useState(null);
    
    async function getState() {
        try {
            const result = await fetch('https://database-final-project-7q1q.onrender.com/getState');
            const data = await result.json();
            setStates(data);
            console.log(states);
        } catch (err) {
            console.error('Error fetching data: ', err);
        }
    }
    
    useEffect(() => {
        getState();
    }, [])


    return (
        <>
            <div>
                {states ? states.map((state, index) => (
                        <div key={index}>
                            <span key={state.fips_state}>{state.fips_state}</span>
                            <span key={state.name_state}>{state.name_state}</span>
                            <br key={index+1}></br>
                        </div>
                )
                ) : <></>}
                <button onClick={getState}>Test</button>
            </div>
        </>
    )
}