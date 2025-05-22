import uuid

import pytest
from pydantic import ValidationError

from vehicle_data.domain.vehicle import Vehicle


class TestVehicle:
    def test_valid_vehicle_creation(self):
        vehicle_id = uuid.uuid4()
        vehicle = Vehicle(id=vehicle_id, name="Test Vehicle")
        
        assert vehicle.id == vehicle_id
        assert vehicle.name == "Test Vehicle"
    
    def test_vehicle_requires_id(self):
        with pytest.raises(ValidationError):
            Vehicle(name="Test Vehicle")
    
    def test_vehicle_requires_name(self):
        with pytest.raises(ValidationError):
            Vehicle(id=uuid.uuid4())
    
    def test_vehicle_id_must_be_uuid(self):
        with pytest.raises(ValidationError):
            Vehicle(id="not-a-uuid", name="Test Vehicle")