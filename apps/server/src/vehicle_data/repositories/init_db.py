import random
from uuid import uuid4

from faker import Faker

from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.repositories.vehicle_repository import VehicleRepository
from vehicle_data.services.fake_date_helper import faker_pendulum_datetime


def init_db():
    repository = VehicleRepository.initialize()

    fake = Faker()

    vehicles = []
    for _ in range(5):
        vehicle = Vehicle(
            id=uuid4(),
            name=fake.user_name(),
        )
        repository.create_vehicle(vehicle)
        vehicles.append(vehicle)

    for vehicle in vehicles:
        for _ in range(random.randint(10, 300)):
            shift_state = random.choice([None, "D", "P", "R", "N"])
            speed = None if shift_state is None else fake.random_int(0, 120)

            vehicle_data = VehicleData(
                timestamp=faker_pendulum_datetime(fake),
                speed=speed,
                odometer=fake.pyfloat(min_value=0, max_value=100000, right_digits=1),
                soc=fake.random_int(0, 100),
                elevation=fake.random_int(0, 1000),
                shift_state=shift_state,
            )

            repository.create_vehicle_data(vehicle.id, vehicle_data)

    print(f"Database initialized with {len(vehicles)} vehicles and their data.")
