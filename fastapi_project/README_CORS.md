# Configuración de CORS en FastAPI

## ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que permite que un navegador web haga peticiones a un dominio diferente al que está sirviendo la página web.

## Problema común

Cuando tu frontend (React/Vue/Angular) intenta hacer peticiones a tu API (FastAPI), el navegador bloquea las peticiones por seguridad si no están configuradas las cabeceras CORS correctamente.

## Solución implementada

### 1. Importar CORSMiddleware

```python
from fastapi.middleware.cors import CORSMiddleware
```

### 2. Configurar CORS

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,      # URLs permitidas
    allow_credentials=settings.ALLOW_CREDENTIALS,  # Cookies/headers
    allow_methods=settings.ALLOW_METHODS,     # Métodos HTTP
    allow_headers=settings.ALLOW_HEADERS,     # Headers permitidos
)
```

### 3. URLs configuradas

```python
CORS_ORIGINS = [
    "http://localhost:5173",      # Vite dev server
    "http://127.0.0.1:5173",     # Vite dev server (alternativo)
    "http://localhost:3000",      # React dev server
    "http://127.0.0.1:3000",     # React dev server (alternativo)
    "http://localhost:8080",      # Otros puertos comunes
    "http://127.0.0.1:8080",
]
```

## Cómo probar

### 1. Iniciar el servidor FastAPI

```bash
cd fastapi_project
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Verificar que CORS funciona

```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     http://localhost:8000/health
```

### 3. Desde el navegador

Abre la consola del navegador y ejecuta:

```javascript
fetch("http://localhost:8000/health")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

## Endpoints de prueba

- `GET /` - Información básica de la API
- `GET /health` - Estado de la API y CORS
- `GET /users` - Lista de usuarios
- `POST /users/` - Crear usuario

## Configuración para producción

Para producción, deberías:

1. **Limitar los orígenes permitidos**:

```python
CORS_ORIGINS = [
    "https://tu-dominio.com",
    "https://www.tu-dominio.com"
]
```

2. **Limitar los métodos permitidos**:

```python
ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE"]
```

3. **Limitar los headers permitidos**:

```python
ALLOW_HEADERS = ["Content-Type", "Authorization"]
```

## Troubleshooting

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

1. Verifica que el middleware esté configurado correctamente
2. Asegúrate de que la URL del frontend esté en `CORS_ORIGINS`
3. Reinicia el servidor después de cambios

### Error: "CORS policy: Request header field is not allowed"

1. Verifica que `ALLOW_HEADERS` incluya los headers necesarios
2. Para desarrollo, puedes usar `["*"]` para permitir todos

### Error: "CORS policy: Method is not allowed"

1. Verifica que `ALLOW_METHODS` incluya el método HTTP necesario
2. Para desarrollo, puedes usar `["*"]` para permitir todos

## Comandos útiles

```bash
# Iniciar servidor con logs detallados
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --log-level debug

# Probar endpoint de salud
curl http://localhost:8000/health

# Probar CORS con preflight
curl -X OPTIONS -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: POST" \
     http://localhost:8000/users/
```
