# DHANMITRA AI 💰
**Your Friendly AI for Smarter Money Decisions**

DHANMITRA AI is a personal finance guidance platform designed for Indian users. It analyzes income, expenses, and risk appetite to provide personalized budgeting advice, savings targets, and educational investment guidance.

> **Disclaimer**: This tool is for educational purposes only and does not constitute professional financial advice.

## 🚀 Project Structure

- **backend/**: FastAPI application handling financial logic (Budgeting, Savings, Risk Analysis).
- **frontend/**: React (Vite) application for the user interface.

## 🛠️ Setup & Run Instructions

### Prerequisites
- Python 3.8+
- Node.js & npm

### 1. Backend Setup (FastAPI)
Navigate to the `backend` folder and install dependencies:

```bash
cd dhanmitra-ai/backend
pip install -r ../requirements.txt
```

Start the server:
```bash
uvicorn app:app --reload
```
*The backend will run at [http://localhost:8000](http://localhost:8000)*

### 2. Frontend Setup (React)
Open a new terminal, navigate to the `frontend` folder:

```bash
cd dhanmitra-ai/frontend
npm install  # (If not already installed)
npm run dev
```

*The frontend will run at [http://localhost:5173](http://localhost:5173)*

## 🧩 How It Works

1.  **Input Details**: Enter your Monthly Income, Expenses, Savings, Age, and Risk Appetite.
2.  **Analysis**:
    - **Budget**: Checks if you are spending within limits (50-30-20 rule).
    - **Savings**: Suggests an Emergency Fund target (3-6x income).
    - **Investment**: Recommends instrument categories (FD, Mutual Funds, etc.) based on risk profile.
3.  **Result**: Visual dashboard with color-coded health indicators.

## 🤖 Tech Stack
- **Frontend**: React, Vite, Lucide-React (Icons), CSS
- **Backend**: FastAPI, Python
- **Logic**: Rule-based Financial Algorithms
