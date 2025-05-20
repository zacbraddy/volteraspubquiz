from fastapi import APIRouter

from vehicle_data.services.vehicle_data import get_vehicle_data

vehicle_data_controller = APIRouter()


@vehicle_data_controller.get("/")
def get_vehicle_data_route():
    return get_vehicle_data()
