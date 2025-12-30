import React from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, IndianRupee, TrendingUp, ShieldCheck } from 'lucide-react';

const Dashboard = ({ data, onReset }) => {
    const { budget, savings, investment_plan } = data;

    const getStatusColor = (color) => {
        switch (color) {
            case 'green': return '#2e7d32'; // Green
            case 'orange': return '#ed6c02'; // Orange
            case 'red': return '#d32f2f'; // Red
            default: return '#1976d2';
        }
    };

    const statusColor = getStatusColor(budget.color);

    return (
        <div className="dashboard fade-in">
            <div className="dashboard-header">
                <h2>Financial Health Report</h2>
                <button onClick={onReset} className="outline-btn">
                    <RefreshCw size={16} /> New Analysis
                </button>
            </div>

            {/* Budget Section */}
            <div className="result-card" style={{ borderLeft: `4px solid ${statusColor}` }}>
                <div className="card-header">
                    <h3>
                        {budget.color === 'green' ? <CheckCircle color={statusColor} /> : <AlertTriangle color={statusColor} />}
                        Budget Analysis
                    </h3>
                    <span className="badge" style={{ backgroundColor: statusColor, color: '#fff' }}>
                        {budget.status}
                    </span>
                </div>
                <p className="main-advice">{budget.advice}</p>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="label">Savings Ratio</span>
                        <span className="value">{budget.savings_ratio}%</span>
                    </div>
                    <div className="stat-item">
                        <span className="label">Monthly Potential Savings</span>
                        <span className="value">₹{budget.savings_amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Savings Section */}
            <div className="result-card blue-accent">
                <div className="card-header">
                    <h3><ShieldCheck color="#0288d1" /> Recommendation: Emergency Fund</h3>
                </div>
                <div className="info-row">
                    <strong>Target Fund Size:</strong>
                    <p>{savings.emergency_fund_range}</p>
                </div>
                <div className="info-row">
                    <strong>Monthly Contribution:</strong>
                    <p>{savings.target_monthly_savings_str}</p>
                </div>
                <p className="note-text">{savings.note}</p>
            </div>

            {/* Investment Section */}
            <div className="result-card purple-accent">
                <div className="card-header">
                    <h3><TrendingUp color="#7b1fa2" /> Investment Plan ({investment_plan.profile})</h3>
                </div>
                <p className="desc-text">{investment_plan.description}</p>

                {/* Allocation Visuals */}
                <div className="allocation-section">
                    {investment_plan.allocation.length > 0 ? (
                        investment_plan.allocation.map((item, index) => (
                            <div key={index} className="allocation-item">
                                <div className="alloc-header">
                                    <span style={{ color: item.color, fontWeight: 'bold' }}>{item.type}</span>
                                    <span>{item.percentage}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{
                                            width: `${item.percentage}%`,
                                            backgroundColor: item.color
                                        }}
                                    ></div>
                                </div>
                                <div className="alloc-details">
                                    <small>Invest: <strong>₹{item.amount.toLocaleString()}</strong></small>
                                    <small>Instruments: {item.instruments}</small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="warning-text">No surplus available for investment plan.</p>
                    )}
                </div>

                <p className="disclaimer-text">{investment_plan.disclaimer}</p>
            </div>

            <div className="footer-disclaimer">
                <p>⚠️ <strong>Disclaimer:</strong> This information is generated by AI for educational purposes only. It is not professional financial advice. Please consult a SEBI registered investment advisor before making decisions.</p>
            </div>
        </div>
    );
};

export default Dashboard;
