from typing import List
from uuid import UUID

import pendulum
from sqlalchemy.orm import Session

from database import get_db
from vehicle_data.domain.vehicle import Vehicle
from vehicle_data.domain.vehicle_data import VehicleData
from vehicle_data.schemas.vehicle import VehicleModel
from vehicle_data.schemas.vehicle_data import VehicleDataModel


class VehicleRepository:
    def __init__(self, db: Session):
        self.db = db

    @classmethod
    def initialize(cls):
        db = next(get_db())
        return cls(db)

    def get_all_vehicles(self) -> List[Vehicle]:
        vehicle_models = self.db.query(VehicleModel).all()
        return [
            Vehicle(
                id=getattr(vehicle_model, "id"), name=getattr(vehicle_model, "name")
            )
            for vehicle_model in vehicle_models
        ]

    def get_vehicle_by_id(self, vehicle_id: UUID) -> Vehicle:
        vehicle_model = (
            self.db.query(VehicleModel)
            .filter(VehicleModel.id == str(vehicle_id))
            .first()
        )
        if vehicle_model is None:
            return None
        return Vehicle(
            id=getattr(vehicle_model, "id"), name=getattr(vehicle_model, "name")
        )

    def get_vehicle_data(
        self,
        vehicle_id: UUID = None,
        page_size: int = None,
        page: int = None,
    ) -> tuple[List[VehicleData], int]:
        query = self.db.query(VehicleDataModel)

        if vehicle_id is not None:
            query = query.filter(VehicleDataModel.vehicle_id == str(vehicle_id))

        total_count = query.count()

        query = query.order_by(VehicleDataModel.timestamp)

        if page_size is not None:
            query = query.limit(page_size)
        if page is not None:
            query = query.offset(page * page_size)

        data_models = query.all()

        vehicle_data = [
            VehicleData(
                timestamp=pendulum.instance(getattr(data_model, "timestamp")),
                speed=getattr(data_model, "speed"),
                odometer=getattr(data_model, "odometer"),
                soc=getattr(data_model, "soc"),
                elevation=getattr(data_model, "elevation"),
                shift_state=getattr(data_model, "shift_state"),
            )
            for data_model in data_models
        ]

        return vehicle_data, total_count

    def create_vehicle(self, vehicle: Vehicle) -> Vehicle:
        vehicle_model = VehicleModel(id=str(vehicle.id), name=vehicle.name)

        self.db.add(vehicle_model)
        self.db.commit()
        self.db.refresh(vehicle_model)

        return vehicle

    def create_vehicle_data(
        self, vehicle_id: UUID, vehicle_data: VehicleData
    ) -> VehicleData:
        data_model = VehicleDataModel(
            vehicle_id=str(vehicle_id),
            timestamp=vehicle_data.timestamp,
            speed=vehicle_data.speed,
            odometer=vehicle_data.odometer,
            soc=vehicle_data.soc,
            elevation=vehicle_data.elevation,
            shift_state=vehicle_data.shift_state,
        )

        self.db.add(data_model)
        self.db.commit()
        self.db.refresh(data_model)

        return vehicle_data
