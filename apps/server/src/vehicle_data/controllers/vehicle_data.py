from uuid import UUID

from fastapi import APIRouter, Query

from vehicle_data.domain.paginated_response import PaginatedResponse
from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.services.vehicle import get_vehicles
from vehicle_data.services.vehicle_data import (
    get_vehicle_data,
)

vehicle_data_controller = APIRouter()


@vehicle_data_controller.get("/", response_model=PaginatedResponse[VehicleData])
def get_vehicle_data_route(
    vehicle_id: UUID | None = None,
    page_size: int = Query(10, ge=1, le=100),
    page: int = Query(0, ge=0),
):
    return get_vehicle_data(vehicle_id, page_size, page)


@vehicle_data_controller.get("/vehicles/", response_model=list[Vehicle])
def get_vehicles_route():
    return get_vehicles()
