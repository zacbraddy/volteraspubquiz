from fastapi import APIRouter

from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.services.vehicle import get_vehicles
from vehicle_data.services.vehicle_data import (
    get_vehicle_data,
)

vehicle_data_controller = APIRouter()


@vehicle_data_controller.get("/", response_model=list[VehicleData])
def get_vehicle_data_route():
    return get_vehicle_data()


@vehicle_data_controller.get("/vehicles/", response_model=list[Vehicle])
def get_vehicles_route():
    return get_vehicles()
