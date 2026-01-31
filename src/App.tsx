import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard';
import DataIngestion from './pages/DataIngestion';
import CarbonCalculation from './pages/CarbonCalculation';
import HotspotAnalysis from './pages/HotspotAnalysis';
import AuditTrust from './pages/AuditTrust';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <main className="main-content" style={{ background: '#f8fafc' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/ingestion" element={<DataIngestion />} />
                        <Route path="/calculation" element={<CarbonCalculation />} />
                        <Route path="/hotspot" element={<HotspotAnalysis />} />
                        <Route path="/audit" element={<AuditTrust />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
