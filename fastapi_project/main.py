from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
import models
import schemas
from datetime import date
from typing import List
from config import settings

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.ALLOW_CREDENTIALS,
    allow_methods=settings.ALLOW_METHODS,
    allow_headers=settings.ALLOW_HEADERS,
)

def calculate_age(birth_date: date) -> int:
    today = date.today()
    age = today.year - birth_date.year
    if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
        age -= 1
    return age

@app.get("/")
def read_root():
    return {
        "message": "Arukay API funcionando correctamente",
        "version": settings.APP_VERSION,
        "cors_enabled": True
    }

@app.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    db_user = models.User(
        name=user.name,
        email=user.email,
        birth_date=user.birth_date
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    user_response = schemas.User(
        id=db_user.id,
        name=db_user.name,
        email=db_user.email,
        birth_date=db_user.birth_date,
        created_at=db_user.created_at,
        age=calculate_age(db_user.birth_date)
    )
    return user_response

@app.get("/users", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    
    if not users:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")
    
    users_with_age = []
    for user in users:
        user_response = schemas.User(
            id=user.id,
            name=user.name,
            email=user.email,
            birth_date=user.birth_date,
            created_at=user.created_at,
            age=calculate_age(user.birth_date)
        )
        users_with_age.append(user_response)
    
    return users_with_age

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_user)
    db.commit()


def normal_function(n):
    result = []
    for i in range(n):
        result.append(i)
    return result
   
@app.get("/normal_function", response_model=List[int])
def get_normal_function():
    return normal_function(1000)

def generator_function(n):
    for i in range(n):
        yield i

@app.get("/generator_function")
async def get_generator_function():
    numeros_generados = list(generator_function(1000000))
    return {"message": "Generador completado", "count": len(numeros_generados)}

