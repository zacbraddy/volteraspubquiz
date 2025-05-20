import pendulum
import pytest
from pydantic import ValidationError

from vehicle_data.domain.vehicle_data import VehicleData


class TestVehicleData:
    def test_both_speed_and_shift_state_can_be_none(self):
        data = VehicleData(
            timestamp=pendulum.now(),
            speed=None,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state=None,
        )
        assert data.speed is None
        assert data.shift_state is None

    def test_speed_can_be_none_when_shift_state_has_a_value(self):
        data = VehicleData(
            timestamp=pendulum.now(),
            speed=None,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D",
        )
        assert data.speed is None
        assert data.shift_state == "D"

    def test_speed_can_have_a_value_while_shift_state_has_a_value(self):
        data = VehicleData(
            timestamp=pendulum.now(),
            speed=50,
            odometer=100.5,
            soc=80,
            elevation=100,
            shift_state="D",
        )
        assert data.speed == 50
        assert data.shift_state == "D"

    def test_throws_a_validation_error_if_shift_state_is_none_but_we_have_a_speed_in_the_model(
        self,
    ):
        with pytest.raises(ValidationError):
            VehicleData(
                timestamp=pendulum.now(),
                speed=50,
                odometer=100.5,
                soc=80,
                elevation=100,
                shift_state=None,
            )
