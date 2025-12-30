from typing import Dict, Any

def analyze_budget(income: float, expenses: float) -> Dict[str, Any]:
    """
    Analyzes the user's budget health based on income and expenses.
    """
    if income <= 0:
        return {
            "status": "Invalid",
            "savings_ratio": 0,
            "advice": "Income must be greater than zero to analyze budget."
        }

    savings = income - expenses
    savings_ratio = (savings / income) * 100

    if expenses > income:
        status = "Critical"
        advice = "You are spending more than you earn! Immediate cutbacks required."
        color = "red"
    elif savings_ratio < 20:
        status = "Needs Improvement"
        advice = f"Try to save at least 20% (₹{income * 0.2:,.0f}). Reduce discretionary spending."
        color = "orange"
    else:
        status = "Healthy"
        advice = "Great job! You are maintaining a healthy savings rate."
        color = "green"

    return {
        "status": status,
        "savings_ratio": round(savings_ratio, 2),
        "savings_amount": savings,
        "advice": advice,
        "color": color
    }

def recommend_savings(income: float, age: int) -> Dict[str, Any]:
    """
    Provides savings recommendations and emergency fund targets.
    """
    emergency_fund_min = income * 3
    emergency_fund_max = income * 6
    
    # Simple heuristic: Older users should have more stable savings
    if age < 30:
        target_savings_pct = 20
    elif age < 50:
        target_savings_pct = 30
    else:
        target_savings_pct = 40

    target_monthly_savings = (income * target_savings_pct) / 100

    return {
        "emergency_fund_range": f"₹{emergency_fund_min:,.0f} - ₹{emergency_fund_max:,.0f}",
        "target_monthly_savings": target_monthly_savings, # Return raw number for calculation
        "target_monthly_savings_str": f"₹{target_monthly_savings:,.0f} ({target_savings_pct}%)",
        "note": "Aim to build an emergency fund covering 3-6 months of income first."
    }

def get_investment_plan(investable_surplus: float, risk_appetite: str) -> Dict[str, Any]:
    """
    Generates a specific investment allocation plan based on risk appetite.
    """
    risk_appetite = risk_appetite.lower()
    
    if investable_surplus <= 0:
         return {
            "profile": "N/A",
            "allocation": [],
            "description": "No surplus available for investment. Focus on reducing expenses first."
        }

    # Allocation Logic
    if risk_appetite == "low":
        profile = "Conservative"
        equity_pct = 20
        debt_pct = 80
        equity_instruments = ["Large Cap Index Fund"]
        debt_instruments = ["Fixed Deposits (FD)", "PPF", "Liquid Funds"]
        desc = "Priority: Capital Protection. 80% safe instruments, 20% for mild growth."

    elif risk_appetite == "medium":
        profile = "Balanced"
        equity_pct = 50
        debt_pct = 50
        equity_instruments = ["Nifty 50 Index Fund", "Flexi-Cap Fund"]
        debt_instruments = ["Corporate Bond Funds", "PPF", "Debt Mutual Funds"]
        desc = "Priority: Growth + Stability. Equal split between Equity and Debt."

    elif risk_appetite == "high":
        profile = "Aggressive"
        equity_pct = 80
        debt_pct = 20
        equity_instruments = ["Mid & Small Cap Funds", "Direct Equity", "Nifty Next 50"]
        debt_instruments = ["Liquid Funds (for dips)", "Short Duration Debt Funds"]
        desc = "Priority: High Growth. 80% Equity for long-term wealth, 20% for stability."
    
    else: # Default/Safe
        profile = "Safety First"
        equity_pct = 0
        debt_pct = 100
        equity_instruments = []
        debt_instruments = ["Fixed Deposits"]
        desc = "Focus on assured returns."

    # Calculate Amounts
    equity_amt = (investable_surplus * equity_pct) / 100
    debt_amt = (investable_surplus * debt_pct) / 100

    allocation = [
        {
            "type": "Equity (Growth)",
            "percentage": equity_pct,
            "amount": equity_amt,
            "instruments": ", ".join(equity_instruments),
            "color": "#9c27b0" # Purple for Growth
        },
        {
            "type": "Debt (Stability)",
            "percentage": debt_pct,
            "amount": debt_amt,
            "instruments": ", ".join(debt_instruments),
            "color": "#0288d1" # Blue for Safety
        }
    ]

    return {
        "profile": profile,
        "allocation": allocation,
        "description": desc,
        "disclaimer": "This is an AI-generated educational plan. Consult a financial advisor."
    }

def perform_full_analysis(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Orchestrates the full financial analysis.
    """
    income = float(data.get('income', 0))
    expenses = float(data.get('expenses', 0))
    current_savings = float(data.get('savings', 0))
    age = int(data.get('age', 25))
    risk = data.get('risk_appetite', 'Medium')

    if income < 0 or expenses < 0 or age < 0:
         return {"error": "Negative values are not allowed."}

    # 1. Budget Health
    budget_analysis = analyze_budget(income, expenses)
    
    # 2. Savings Recommendations
    savings_rec = recommend_savings(income, age)
    
    # 3. Investment Plan
    # We use the 'target monthly savings' as the base for the investment plan,
    # OR the actual savings if it's positive. Let's use the actual current monthly savings (surplus).
    actual_monthly_surplus = income - expenses
    
    # Logic: 
    # If Surplus > 0:
    #   - 30% to Liquid Emergency Fund building (until 6 months met - we simulate this)
    #   - 70% to Long Term Investment
    
    # For simplicity, we assume the user puts their entire monthly surplus into the plan
    investment_plan = get_investment_plan(max(0, actual_monthly_surplus), risk)

    return {
        "budget": budget_analysis,
        "savings": savings_rec,
        "investment_plan": investment_plan
    }
