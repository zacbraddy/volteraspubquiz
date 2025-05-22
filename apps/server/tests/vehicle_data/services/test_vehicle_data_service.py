import uuid
from unittest.mock import MagicMock, patch

import pendulum

from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.services.vehicle_data import (
    get_vehicle_data,
    get_vehicle_data_by_vehicle_id,
)


class TestVehicleDataService:
    @patch('vehicle_data.services.vehicle_data.get_vehicles')
    @patch('vehicle_data.services.vehicle_data.VehicleRepository')
    def test_get_vehicle_data(self, mock_repository_class, mock_get_vehicles):
        vehicle_id1 = uuid.uuid4()
        vehicle_id2 = uuid.uuid4()

        mock_get_vehicles.return_value = [
            Vehicle(id=vehicle_id1, name="Vehicle 1"),
            Vehicle(id=vehicle_id2, name="Vehicle 2")
        ]

        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_data1 = VehicleData(
            timestamp=pendulum.now(),
            speed=50,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D"
        )
        vehicle_data2 = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D"
        )

        mock_repository.get_vehicle_data.side_effect = lambda vid: [vehicle_data1, vehicle_data2] if vid == vehicle_id1 else [vehicle_data2]

        result = get_vehicle_data()

        assert len(result) == 3
        assert result[0] == vehicle_data1
        assert result[1] == vehicle_data2
        assert result[2] == vehicle_data2

        mock_get_vehicles.assert_called_once()
        mock_repository_class.initialize.assert_called_once()
        assert mock_repository.get_vehicle_data.call_count == 2

    @patch('vehicle_data.services.vehicle_data.VehicleRepository')
    def test_get_vehicle_data_by_vehicle_id(self, mock_repository_class):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_id = uuid.uuid4()
        vehicle_data1 = VehicleData(
            timestamp=pendulum.now(),
            speed=50,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D"
        )
        vehicle_data2 = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D"
        )
        mock_repository.get_vehicle_data.return_value = [vehicle_data1, vehicle_data2]

        result = get_vehicle_data_by_vehicle_id(vehicle_id)

        assert result == [vehicle_data1, vehicle_data2]
        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_data.assert_called_once_with(vehicle_id)
