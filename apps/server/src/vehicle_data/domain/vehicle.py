from uuid import UUID

from pydantic import BaseModel


class Vehicle(BaseModel):
    id: UUID
    name: str
