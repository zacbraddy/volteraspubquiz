import uuid
from unittest.mock import MagicMock, patch

import pendulum

from vehicle_data.domain.paginated_response import PaginatedResponse
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.services.vehicle_data import (
    get_vehicle_data,
)


class TestVehicleDataService:
    @patch("vehicle_data.services.vehicle_data.VehicleRepository")
    def test_get_vehicle_data(self, mock_repository_class):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_data1 = VehicleData(
            timestamp=pendulum.now(),
            speed=50,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D",
        )
        vehicle_data2 = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D",
        )

        mock_repository.get_vehicle_data.return_value = (
            [vehicle_data1, vehicle_data2],
            2,
        )

        result = get_vehicle_data()

        assert isinstance(result, PaginatedResponse)
        assert result.total == 2
        assert result.page_size == 10
        assert result.page == 1
        assert len(result.items) == 2
        assert result.items[0] == vehicle_data1
        assert result.items[1] == vehicle_data2

        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_data.assert_called_once_with(None, 10, 1)

    @patch("vehicle_data.services.vehicle_data.VehicleRepository")
    def test_get_vehicle_data_with_pagination(self, mock_repository_class):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_data = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D",
        )

        mock_repository.get_vehicle_data.return_value = ([vehicle_data], 5)

        result = get_vehicle_data(page_size=2, page=2)

        assert isinstance(result, PaginatedResponse)
        assert result.total == 5
        assert result.page_size == 2
        assert result.page == 2
        assert len(result.items) == 1
        assert result.items[0] == vehicle_data

        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_data.assert_called_once_with(None, 2, 2)

    @patch("vehicle_data.services.vehicle_data.VehicleRepository")
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
            shift_state="D",
        )
        vehicle_data2 = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D",
        )

        mock_repository.get_vehicle_data.return_value = (
            [vehicle_data1, vehicle_data2],
            2,
        )

        result = get_vehicle_data(vehicle_id)

        assert isinstance(result, PaginatedResponse)
        assert result.total == 2
        assert result.page_size == 10
        assert result.page == 1
        assert len(result.items) == 2
        assert result.items[0] == vehicle_data1
        assert result.items[1] == vehicle_data2

        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_data.assert_called_once_with(vehicle_id, 10, 1)

    @patch("vehicle_data.services.vehicle_data.VehicleRepository")
    def test_get_vehicle_data_by_vehicle_id_with_pagination(
        self, mock_repository_class
    ):
        mock_repository = MagicMock()
        mock_repository_class.initialize.return_value = mock_repository

        vehicle_id = uuid.uuid4()
        vehicle_data2 = VehicleData(
            timestamp=pendulum.now().add(minutes=5),
            speed=60,
            odometer=105.5,
            soc=75,
            elevation=110,
            shift_state="D",
        )

        mock_repository.get_vehicle_data.return_value = ([vehicle_data2], 2)

        result = get_vehicle_data(vehicle_id, page_size=1, page=1)

        assert isinstance(result, PaginatedResponse)
        assert result.total == 2
        assert result.page_size == 1  # Custom limit
        assert result.page == 1  # Custom offset
        assert len(result.items) == 1
        assert result.items[0] == vehicle_data2

        mock_repository_class.initialize.assert_called_once()
        mock_repository.get_vehicle_data.assert_called_once_with(vehicle_id, 1, 1)
