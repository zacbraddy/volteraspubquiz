import random

from faker import Faker

from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.services.fake_date_helper import faker_pendulum_datetime


def get_vehicle_data():
    fake = Faker()

    new_vehicle_data = []

    vehicle_data_count = fake.random_int(5, 500)

    for _ in range(vehicle_data_count):
        shift_state = random.choice([None, "D", "P", "R", "N"])
        speed = None if shift_state is None else fake.random_int(0, 120)

        new_vehicle_data.append(
            VehicleData(
                timestamp=faker_pendulum_datetime(fake),
                speed=speed,
                odometer=fake.pyfloat(min_value=0, max_value=100000, right_digits=1),
                soc=fake.random_int(0, 100),
                elevation=fake.random_int(0, 1000),
                shift_state=shift_state,
            )
        )

    return new_vehicle_data
