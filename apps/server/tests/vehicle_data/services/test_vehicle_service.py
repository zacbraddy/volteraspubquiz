import uuid
from unittest.mock import MagicMock, patch

from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.services.vehicle import get_vehicle_by_id, get_vehicles


class TestVehicleService:
    @patch("vehicle_data.services.vehicle.VehicleRepository")
    def test_get_vehicles(self, mock_repository_class):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle1 = Vehicle(id=uuid.uuid4(), name="Vehicle 1")
        vehicle2 = Vehicle(id=uuid.uuid4(), name="Vehicle 2")
        mock_repository.get_all_vehicles.return_value = [vehicle1, vehicle2]

        result = get_vehicles()

        assert result == [vehicle1, vehicle2]
        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_all_vehicles.assert_called_once()

    @patch("vehicle_data.services.vehicle.VehicleRepository")
    def test_get_vehicle_by_id(self, mock_repository_class):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_id = uuid.uuid4()
        vehicle = Vehicle(id=vehicle_id, name="Test Vehicle")
        mock_repository.get_vehicle_by_id.return_value = vehicle

        result = get_vehicle_by_id(vehicle_id)

        assert result == vehicle
        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_by_id.assert_called_once_with(vehicle_id)
