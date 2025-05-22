from uuid import uuid4

from faker import Faker

from vehicle_data.domain.vehicle import Vehicle


def get_vehicles():
    fake = Faker()

    new_vehicles = []

    vehicle_count = fake.random_int(5, 15)

    for _ in range(vehicle_count):
        new_vehicles.append(
            Vehicle(
                id=uuid4(),
                name=fake.user_name(),
            )
        )

    return new_vehicles
