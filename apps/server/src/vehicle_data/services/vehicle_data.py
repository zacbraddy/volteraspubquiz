from uuid import UUID

from vehicle_data.domain.paginated_response import PaginatedResponse
from vehicle_data.repositories.vehicle_repository import VehicleRepository


def get_vehicle_data(
    vehicle_id: UUID | None = None, page_size: int = 10, page: int = 1
):
    repository = VehicleRepository.initialize()

    data, total = repository.get_vehicle_data(vehicle_id, page_size, page)
    return PaginatedResponse(items=data, total=total, page_size=page_size, page=page)
