from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from database import Base


class VehicleDataModel(Base):
    __tablename__ = "vehicle_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    vehicle_id = Column(String, ForeignKey("vehicles.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    speed = Column(Integer, nullable=True)
    odometer = Column(Float, nullable=False)
    soc = Column(Integer, nullable=False)
    elevation = Column(Integer, nullable=False)
    shift_state = Column(String(1), nullable=True)

    vehicle = relationship("VehicleModel", back_populates="data")
