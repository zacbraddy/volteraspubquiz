import uuid
from unittest.mock import MagicMock, patch

import pendulum
import pytest

from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.repositories.vehicle_repository import VehicleRepository
from vehicle_data.schemas.vehicle import VehicleModel
from vehicle_data.schemas.vehicle_data import VehicleDataModel


class TestVehicleRepository:
    @pytest.fixture
    def mock_db(self):
        return MagicMock()

    @pytest.fixture
    def repository(self, mock_db):
        return VehicleRepository(mock_db)

    @patch("vehicle_data.repositories.vehicle_repository.get_db")
    def test_initialize(self, mock_get_db, mock_db):
        mock_get_db.return_value = iter([mock_db])

        repository = VehicleRepository.initialize()

        assert isinstance(repository, VehicleRepository)
        assert repository.db == mock_db

    def test_get_all_vehicles(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        mock_vehicle_model = MagicMock()
        mock_vehicle_model.id = str(vehicle_id)
        mock_vehicle_model.name = "Test Vehicle"

        mock_db.query.return_value.all.return_value = [mock_vehicle_model]

        vehicles = repository.get_all_vehicles()

        assert len(vehicles) == 1
        assert vehicles[0].id == vehicle_id
        assert vehicles[0].name == "Test Vehicle"
        mock_db.query.assert_called_once_with(VehicleModel)

    def test_get_vehicle_by_id(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        mock_vehicle_model = MagicMock()
        mock_vehicle_model.id = str(vehicle_id)
        mock_vehicle_model.name = "Test Vehicle"

        mock_db.query.return_value.filter.return_value.first.return_value = (
            mock_vehicle_model
        )

        vehicle = repository.get_vehicle_by_id(vehicle_id)

        assert vehicle.id == vehicle_id
        assert vehicle.name == "Test Vehicle"
        mock_db.query.assert_called_once_with(VehicleModel)
        mock_db.query.return_value.filter.assert_called_once()

    def test_get_vehicle_by_id_not_found(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        mock_db.query.return_value.filter.return_value.first.return_value = None

        vehicle = repository.get_vehicle_by_id(vehicle_id)

        assert vehicle is None
        mock_db.query.assert_called_once_with(VehicleModel)
        mock_db.query.return_value.filter.assert_called_once()

    def test_get_vehicle_data(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        mock_data_model = MagicMock()
        mock_data_model.timestamp = pendulum.now()
        mock_data_model.speed = 50
        mock_data_model.odometer = 100.5
        mock_data_model.soc = 80
        mock_data_model.elevation = 100
        mock_data_model.shift_state = "D"

        mock_query = mock_db.query.return_value
        mock_filter = mock_query.filter.return_value
        mock_filter.count.return_value = 1
        mock_order_by = mock_filter.order_by.return_value
        mock_order_by.all.return_value = [mock_data_model]

        vehicle_data, total = repository.get_vehicle_data(vehicle_id)

        assert total == 1
        assert len(vehicle_data) == 1
        assert isinstance(vehicle_data[0], VehicleData)
        assert vehicle_data[0].speed == 50
        assert vehicle_data[0].odometer == 100.5
        assert vehicle_data[0].soc == 80
        assert vehicle_data[0].elevation == 100
        assert vehicle_data[0].shift_state == "D"

        mock_db.query.assert_called_with(VehicleDataModel)
        mock_query.filter.assert_called_once()
        mock_filter.count.assert_called_once()
        mock_filter.order_by.assert_called_once()
        mock_order_by.all.assert_called_once()

    def test_get_vehicle_data_with_pagination(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        mock_data_model = MagicMock()
        mock_data_model.timestamp = pendulum.now()
        mock_data_model.speed = 50
        mock_data_model.odometer = 100.5
        mock_data_model.soc = 80
        mock_data_model.elevation = 100
        mock_data_model.shift_state = "D"

        mock_query = mock_db.query.return_value
        mock_filter = mock_query.filter.return_value
        mock_filter.count.return_value = 10
        mock_order_by = mock_filter.order_by.return_value
        mock_limit = mock_order_by.limit.return_value
        mock_offset = mock_limit.offset.return_value
        mock_offset.all.return_value = [mock_data_model]

        vehicle_data, total = repository.get_vehicle_data(vehicle_id, page_size=5, page=2)

        assert total == 10
        assert len(vehicle_data) == 1

        # Verify the query was built correctly with pagination
        mock_db.query.assert_called_with(VehicleDataModel)
        mock_query.filter.assert_called_once()
        mock_filter.count.assert_called_once()
        mock_filter.order_by.assert_called_once()
        mock_order_by.limit.assert_called_once_with(5)
        mock_limit.offset.assert_called_once_with(2 * 5)
        mock_offset.all.assert_called_once()


    def test_create_vehicle(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        vehicle = Vehicle(id=vehicle_id, name="Test Vehicle")

        result = repository.create_vehicle(vehicle)

        assert result == vehicle
        mock_db.add.assert_called_once()
        mock_db.commit.assert_called_once()
        mock_db.refresh.assert_called_once()

    def test_create_vehicle_data(self, repository, mock_db):
        vehicle_id = uuid.uuid4()
        vehicle_data = VehicleData(
            timestamp=pendulum.now(),
            speed=50,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D",
        )

        result = repository.create_vehicle_data(vehicle_id, vehicle_data)

        assert result == vehicle_data
        mock_db.add.assert_called_once()
        mock_db.commit.assert_called_once()
        mock_db.refresh.assert_called_once()
