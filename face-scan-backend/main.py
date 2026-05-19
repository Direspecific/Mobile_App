from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import liveness, registration

app = FastAPI(title="Voter ID AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(liveness.router, prefix="/ai", tags=["Liveness"])
app.include_router(registration.router, prefix="/ai", tags=["Registration"])

@app.get("/health")
async def health():
    return { "status": "ok" }