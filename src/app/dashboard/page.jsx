"use client";
import React, { useState, useEffect } from "react";
import "chart.js/auto";
import SummaryPanel from "../components/dashboard/summaryPanel";
import RegionalAnalysisPanel from "../components/dashboard/regionalAnalysisPanel";
import TrendsAnalysisPanel from "../components/dashboard/TrendsAnalysisPanel";
import styles from './dashboard.module.css';
import UploadSection from "../components/dashboard/uploadFile/UploadSection";

function Dashboard() {

    return (
    <>
        <div className={styles.container}>
            <SummaryPanel/>
            <TrendsAnalysisPanel />
            <RegionalAnalysisPanel />
            <UploadSection />
        </div>
    </>
    );
}

export default Dashboard;
