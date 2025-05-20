from vehicle_data.services.vehicle_data import get_vehicle_data


class TestVehicleDataService:
    def test_get_vehicle_data(self):
        vehicle_data = get_vehicle_data()

        assert len(vehicle_data) > 0

        first_item = vehicle_data[0]
        assert hasattr(first_item, 'timestamp')
        assert hasattr(first_item, 'speed')
        assert hasattr(first_item, 'odometer')
        assert hasattr(first_item, 'soc')
        assert hasattr(first_item, 'elevation')
        assert hasattr(first_item, 'shift_state')

