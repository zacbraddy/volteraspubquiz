from typing import Optional

from pydantic import BaseModel, Field, model_validator
from pydantic_extra_types.pendulum_dt import DateTime


class VehicleData(BaseModel):
    timestamp: DateTime
    speed: Optional[int]
    odometer: float
    soc: int
    elevation: int
    shift_state: Optional[str] = Field(default=None, max_length=1)

    @model_validator(mode='after')
    def speed_must_be_null_if_shift_state_is_null(cls, values):
        speed = values.speed
        shift_state = values.shift_state
        if shift_state is None and speed is not None:
            raise ValueError('speed must be null if shift_state is null')
        return values
