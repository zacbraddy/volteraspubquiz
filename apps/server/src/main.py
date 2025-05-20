from fastapi import FastAPI

from vehicle_data.controllers.vehicle_data import vehicle_data_controller

app = FastAPI(root_path="/api/v1")

app.mount("/vehicle_data", vehicle_data_controller)
