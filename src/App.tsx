import React, { useState } from 'react';
import './index.css';
import ViewsRecommendations from './pages/ViewsRecommendations';
import DataIngestion from './pages/DataIngestion';
import CarbonCalculation from './pages/CarbonCalculation';
import HotspotAnalysis from './pages/HotspotAnalysis';
import AuditTrust from './pages/AuditTrust';
import { DataProvider } from './context/DataContext';

type Page = 'views' | 'ingestion' | 'calculation' | 'hotspot' | 'audit';

function AppContent() {
    const [currentPage, setCurrentPage] = useState<Page>('views');

    const renderPage = () => {
        switch (currentPage) {
            case 'views':
                return <ViewsRecommendations />;
            case 'ingestion':
                return <DataIngestion />;
            case 'calculation':
                return <CarbonCalculation />;
            case 'hotspot':
                return <HotspotAnalysis />;
            case 'audit':
                return <AuditTrust />;
            default:
                return <ViewsRecommendations />;
        }
    };

    const menuItems = [
        { id: 'views' as Page, label: 'Views & Recommendations' },
        { id: 'ingestion' as Page, label: 'Intake & Extraction' },
        { id: 'calculation' as Page, label: 'Calculation Engine' },
        { id: 'hotspot' as Page, label: 'Hotspot Intelligence' },
        { id: 'audit' as Page, label: 'Audit & Verification' },
    ];

    return (
        <div className="app-container">
            <aside className="sidebar" style={{ background: '#fff', boxShadow: '10px 0 30px rgba(0,0,0,0.02)' }}>
                <div className="sidebar-header" style={{ padding: '32px 24px', border: 'none' }}>
                    <img src="/images/logo.jpeg" alt="ScopeZero" style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(74,127,184,0.3)'
                    }} />
                    <span className="logo-text" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>Scope<span style={{ color: 'var(--blue-primary)' }}>Zero</span></span>
                </div>

                <nav className="sidebar-nav" style={{ padding: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', paddingLeft: '16px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Intelligence Suite</div>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => setCurrentPage(item.id)}
                            style={{
                                margin: '2px 0',
                                padding: '12px 16px',
                                transition: 'all 0.2s',
                                borderRadius: '12px'
                            }}
                        >
                            <span className="nav-label" style={{ fontWeight: currentPage === item.id ? 700 : 500, fontSize: '14px' }}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer" style={{ padding: '24px', border: 'none' }}>
                    <div className="user-profile" style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: '16px', border: '1px solid var(--gray-100)' }}>
                        <div className="user-info">
                            <div className="user-name" style={{ fontWeight: 700, fontSize: '13px' }}>Ajay Ramasamy</div>
                            <div className="user-role" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Sustainability Lead</div>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="main-content" style={{ background: '#f8fafc' }}>
                <header className="top-bar" style={{ background: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(10px)', border: 'none', padding: '0 48px', height: '80px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div className="top-bar-right" style={{ display: 'flex', gap: '8px' }}>
                    </div>
                </header>
                <div style={{ paddingBottom: '60px' }}>
                    {renderPage()}
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <DataProvider>
            <AppContent />
        </DataProvider>
    );
}

export default App;
