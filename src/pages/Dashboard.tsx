import React from 'react';
import { useAppData } from '../context/DataContext';

const Dashboard: React.FC = () => {
    const { data } = useAppData();

    const topSupplier = data.suppliers[0] || { name: 'N/A', contribution: 0 };
    const topMaterial = data.materials[0] || { name: 'N/A', percentage: 0 };
    const topTransport = data.transportModes[0] || { mode: 'N/A', value: 0 };

    const kpis = [
        { title: 'Total Scope 3', value: data.totalEmissions.toLocaleString(), unit: 'kgCO2e', status: 'blue' },
        { title: 'Largest Hotspot', value: topSupplier.name, unit: `${topSupplier.contribution}% Contribution`, status: 'yellow' },
        { title: 'Reduction Potential', value: data.potentialReduction.toLocaleString(), unit: 'kgCO2e', status: 'green' },
        { title: 'Mitigation Actions', value: data.recommendations.length, unit: 'Strategies', status: 'blue' },
    ];

    return (
        <div className="page-wrapper fade-in" style={{ paddingTop: '0' }}>
            <div className="page-header" style={{ marginBottom: '32px', border: 'none', padding: '0', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="page-title" style={{ fontSize: '32px', fontWeight: 800 }}>Supply Chain Overview</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>System Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-primary)', fontWeight: 800, fontSize: '13px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green-primary)', boxShadow: '0 0 10px var(--green-primary)' }}></div>
                        REACTIVE ENGINE ACTIVE
                    </div>
                </div>
            </div>

            {/* Premium Stat Cards */}
            <div className="grid-4" style={{ marginBottom: '40px' }}>
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="card stat-card" style={{ cursor: 'pointer', border: 'none', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                            <span className={`badge badge-${kpi.status}`} style={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px' }}>Live</span>
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>{kpi.value}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {kpi.title} <div style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '11px', marginTop: '2px' }}>{kpi.unit}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid-2" style={{ gap: '32px', marginBottom: '32px' }}>
                <div className="card">
                    <h3 className="card-header">Emissions Split by Category</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '48px', padding: '20px 0' }}>
                        <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                            <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.05))' }}>
                                {data.categoryBreakdown.map((cat, i) => {
                                    let offset = 0;
                                    for (let j = 0; j < i; j++) offset += data.categoryBreakdown[j].percentage;
                                    return (
                                        <circle
                                            key={i}
                                            cx="18" cy="18" r="15.9"
                                            fill="transparent"
                                            stroke={cat.color}
                                            strokeWidth="3.2"
                                            strokeDasharray={`${cat.percentage} ${100 - cat.percentage}`}
                                            strokeDashoffset={-offset}
                                            style={{ transition: 'all 1s ease' }}
                                        />
                                    );
                                })}
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Net Impact</div>
                                <div style={{ fontSize: '24px', fontWeight: 800 }}>100%</div>
                            </div>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {data.categoryBreakdown.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px', borderRadius: '12px', transition: 'all 0.2s', cursor: 'pointer' }} className="hover-light">
                                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }}></div>
                                    <span style={{ flex: 1, fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-header">Primary Risk Hotspots</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 0' }}>
                        {[
                            { label: 'Risk Entity', value: topSupplier.name, sub: `${topSupplier.contribution}% of dataset footprint`, color: 'yellow' },
                            { label: 'Resource Intensity', value: topMaterial.name, sub: `${topMaterial.percentage}% material share`, color: 'blue' },
                            { label: 'Logistics Volatility', value: topTransport.mode, sub: `${topTransport.value.toLocaleString()} kgCO2e logged`, color: 'green' }
                        ].map((hotspot, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{hotspot.label}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700 }}>{hotspot.value}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hotspot.sub}</div>
                                </div>
                                <span className={`badge badge-${hotspot.color}`} style={{ fontWeight: 800, minWidth: '100px', textAlign: 'center' }}>IDENTIFIED</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="card-header">Dynamic Emission Trajectory</h3>
                <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '5%', padding: '40px 60px 40px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 40, left: 60, right: 60, bottom: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                        {[1, 2, 3, 4].map(i => <div key={i} style={{ height: '1px', background: 'var(--gray-100)', width: '100%' }}></div>)}
                    </div>
                    {data.trendData.length > 0 ? (
                        data.trendData.map((point, idx) => {
                            const maxVal = Math.max(...data.trendData.map(p => p.emissions), 1000);
                            return (
                                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 1, height: '100%' }}>
                                    <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                        <div style={{
                                            width: '100%',
                                            height: `${(point.emissions / maxVal) * 100}%`,
                                            background: 'linear-gradient(180deg, var(--blue-primary) 0%, rgba(74, 127, 184, 0.1) 100%)',
                                            borderRadius: '8px 8px 0 0',
                                            position: 'relative',
                                            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                        }} className="chart-bar">
                                            <div style={{
                                                position: 'absolute',
                                                top: '-28px',
                                                width: '100%',
                                                textAlign: 'center',
                                                fontSize: '11px',
                                                fontWeight: 800,
                                                color: 'var(--blue-primary)'
                                            }}>
                                                {point.emissions.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase' }}>{point.month}</div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No longitudinal data present in dataset.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
