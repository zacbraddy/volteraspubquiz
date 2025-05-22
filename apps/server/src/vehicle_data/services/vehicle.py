from vehicle_data.repositories.vehicle_repository import VehicleRepository


def get_vehicles():
    repository = VehicleRepository.initialize()
    return repository.get_all_vehicles()


def get_vehicle_by_id(vehicle_id):
    repository = VehicleRepository.initialize()
    return repository.get_vehicle_by_id(vehicle_id)
