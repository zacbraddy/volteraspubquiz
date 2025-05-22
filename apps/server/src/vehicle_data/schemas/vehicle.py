from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import String

from database import Base


class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)

    data = relationship("VehicleDataModel", back_populates="vehicle")
