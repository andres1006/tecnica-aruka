import os
from typing import List

class Settings:
    """Configuraciones de la aplicación"""
    
    # Configuración de CORS mejorada
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:4173",  # Puerto alternativo de Vite
        "http://127.0.0.1:4173",
    ]
    
    # Configuración de la base de datos
    DATABASE_URL: str = "sqlite:///./test.db"
    
    # Configuración de la aplicación
    APP_NAME: str = "Arukay API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Configuración de seguridad mejorada
    ALLOW_CREDENTIALS: bool = True
    ALLOW_METHODS: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
    ALLOW_HEADERS: List[str] = [
        "Content-Type", 
        "Authorization", 
        "Accept", 
        "Origin", 
        "X-Requested-With",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods"
    ]

# Instancia de configuración
settings = Settings() 