from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr
    birth_date: date

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    age: int

    class Config:
        from_attributes = True 