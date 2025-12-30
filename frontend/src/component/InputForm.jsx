import React, { useState } from 'react';
import { IndianRupee, ArrowRight, ShieldAlert } from 'lucide-react';

const InputForm = ({ onAnalyze, loading }) => {
    const [formData, setFormData] = useState({
        income: '',
        expenses: '',
        savings: '',
        age: '',
        risk_appetite: 'Medium'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAnalyze(formData);
    };

    return (
        <div className="card fade-in">
            <div className="header-section">
                <h1>Welcome to <span className="brand-name">DhanMitra AI</span></h1>
                <p className="subtitle">Your friendly guide specific for Indian financial goals.</p>
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <div className="form-group">
                    <label>Monthly Income (₹)</label>
                    <div className="input-wrapper">
                        <IndianRupee size={18} className="icon" />
                        <input
                            type="number"
                            name="income"
                            placeholder="e.g. 50000"
                            value={formData.income}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Monthly Expenses (₹)</label>
                    <div className="input-wrapper">
                        <IndianRupee size={18} className="icon" />
                        <input
                            type="number"
                            name="expenses"
                            placeholder="e.g. 30000"
                            value={formData.expenses}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Current Savings (₹)</label>
                    <div className="input-wrapper">
                        <IndianRupee size={18} className="icon" />
                        <input
                            type="number"
                            name="savings"
                            placeholder="e.g. 100000"
                            value={formData.savings}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group half">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            placeholder="25"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="18"
                            max="100"
                        />
                    </div>

                    <div className="form-group half">
                        <label>Risk Appetite</label>
                        <select
                            name="risk_appetite"
                            value={formData.risk_appetite}
                            onChange={handleChange}
                        >
                            <option value="Low">Low (Safe)</option>
                            <option value="Medium">Medium (Balanced)</option>
                            <option value="High">High (Aggressive)</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="primary-btn" disabled={loading}>
                    {loading ? 'Analyzing...' : <>Get Recommendations <ArrowRight size={18} /></>}
                </button>
            </form>

            <div className="disclaimer-mini">
                <ShieldAlert size={14} /> Educational Tool Only
            </div>
        </div>
    );
};

export default InputForm;
