import pendulum
from faker import Faker

from vehicle_data.services.fake_date_helper import faker_pendulum_datetime


class TestFakeDateHelper:
    def test_faker_pendulum_datetime_basic(self):
        fake = Faker()

        dt = faker_pendulum_datetime(fake)

        assert isinstance(dt, pendulum.DateTime)

    def test_faker_pendulum_datetime_with_timezone(self):
        fake = Faker()

        dt_with_tz = faker_pendulum_datetime(fake, tzinfo=pendulum.timezone("UTC"))
        assert dt_with_tz.timezone_name == "UTC"

    def test_faker_pendulum_datetime_return_type(self):
        fake = Faker()

        dt_no_params = faker_pendulum_datetime(fake)
        assert isinstance(dt_no_params, pendulum.DateTime)

    def test_faker_pendulum_datetime_returns_different_values(self):
        fake = Faker()

        dt_first = faker_pendulum_datetime(fake)
        dt_second = faker_pendulum_datetime(fake)
        assert dt_first != dt_second
