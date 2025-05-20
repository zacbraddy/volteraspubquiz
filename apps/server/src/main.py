import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from vehicle_data.controllers.vehicle_data import vehicle_data_controller

load_dotenv()

app = FastAPI(root_path="/api/v1")

allowed_origins = []

if os.getenv("ENVIRON") == "development":
    allowed_origins.append("http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Your React app's URL
    allow_methods=["GET"],
    allow_headers=[],
)

app.mount("/vehicle_data", vehicle_data_controller)
