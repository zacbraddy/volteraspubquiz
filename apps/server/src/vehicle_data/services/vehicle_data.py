from uuid import UUID

from vehicle_data.repositories.vehicle_repository import VehicleRepository
from vehicle_data.services.vehicle import get_vehicles


def get_vehicle_data(vehicle_id: UUID | None = None):
    repository = VehicleRepository.initialize()

    if vehicle_id is not None:
        return repository.get_vehicle_data(vehicle_id)

    vehicles = get_vehicles()

    all_vehicle_data = []
    for vehicle in vehicles:
        vehicle_data = repository.get_vehicle_data(vehicle.id)
        all_vehicle_data.extend(vehicle_data)

    return all_vehicle_data
