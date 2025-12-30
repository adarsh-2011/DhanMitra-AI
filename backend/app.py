from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from finance_logic import perform_full_analysis

app = FastAPI(
    title="DHANMITRA AI",
    description="Your Friendly AI for Smarter Money Decisions",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    income: float
    expenses: float
    savings: float
    age: int
    risk_appetite: str

@app.get("/health")
def health_check():
    return {"status": "ok", "app": "DHANMITRA AI"}

@app.post("/analyze")
def analyze_finances(request: AnalysisRequest):
    try:
        data = request.dict()
        result = perform_full_analysis(data)
        if "error" in result:
             raise HTTPException(status_code=400, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
