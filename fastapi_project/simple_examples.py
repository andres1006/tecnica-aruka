#!/usr/bin/env python3
"""
Ejemplos SENCILLOS: Funciones Normales vs Generadores
Concepto básico explicado paso a paso
"""

print("=" * 50)
print("📚 CONCEPTO BÁSICO: Funciones Normales vs Generadores")
print("=" * 50)

# ============================================================================
# EJEMPLO 1: Generar números del 1 al 5
# ============================================================================

print("\n🔢 EJEMPLO 1: Generar números del 1 al 5")
print("-" * 40)

# Función NORMAL
def funcion_normal():
    """Función NORMAL: Crea una lista completa y la devuelve"""
    print("🔴 Función NORMAL: Creando lista completa...")
    numeros = []
    for i in range(1, 6):
        numeros.append(i)
        print(f"   Agregando {i} a la lista")
    print(f"✅ Lista completa creada: {numeros}")
    return numeros

# Generador
def generador():
    """GENERADOR: Produce números uno por uno"""
    print("🟢 GENERADOR: Produciendo números uno por uno...")
    for i in range(1, 6):
        print(f"   Produciendo {i}")
        yield i

print("\n🔴 Usando función NORMAL:")
resultado_normal = funcion_normal()
print(f"Resultado: {resultado_normal}")

print("\n🟢 Usando GENERADOR:")
resultado_generador = list(generador())
print(f"Resultado: {resultado_generador}")

# ============================================================================
# EJEMPLO 2: Procesar palabras
# ============================================================================

print("\n📝 EJEMPLO 2: Procesar palabras")
print("-" * 40)

palabras = ["hola", "mundo", "python", "generadores"]

# Función NORMAL
def procesar_palabras_normal(lista_palabras):
    """Función NORMAL: Procesa todas las palabras de una vez"""
    print("🔴 Función NORMAL: Procesando todas las palabras...")
    resultado = []
    for palabra in lista_palabras:
        palabra_mayuscula = palabra.upper()
        resultado.append(palabra_mayuscula)
        print(f"   Procesando: {palabra} -> {palabra_mayuscula}")
    print(f"✅ Todas las palabras procesadas: {resultado}")
    return resultado

# Generador
def procesar_palabras_generador(lista_palabras):
    """GENERADOR: Procesa palabras una por una"""
    print("🟢 GENERADOR: Procesando palabras una por una...")
    for palabra in lista_palabras:
        palabra_mayuscula = palabra.upper()
        print(f"   Produciendo: {palabra} -> {palabra_mayuscula}")
        yield palabra_mayuscula

print("\n🔴 Usando función NORMAL:")
resultado_normal = procesar_palabras_normal(palabras)
print(f"Resultado: {resultado_normal}")

print("\n🟢 Usando GENERADOR:")
resultado_generador = list(procesar_palabras_generador(palabras))
print(f"Resultado: {resultado_generador}")

# ============================================================================
# EJEMPLO 3: Simular lectura de archivo
# ============================================================================

print("\n📄 EJEMPLO 3: Simular lectura de archivo")
print("-" * 40)

# Simular líneas de un archivo
lineas_archivo = [
    "Línea 1: Hola mundo",
    "Línea 2: Python es genial",
    "Línea 3: Los generadores son útiles",
    "Línea 4: Ahorran memoria"
]

# Función NORMAL
def leer_archivo_normal(lineas):
    """Función NORMAL: Lee todas las líneas de una vez"""
    print("🔴 Función NORMAL: Leyendo todas las líneas...")
    contenido = []
    for linea in lineas:
        contenido.append(linea.strip())
        print(f"   Leyendo: {linea.strip()}")
    print(f"✅ Todas las líneas leídas: {len(contenido)} líneas")
    return contenido

# Generador
def leer_archivo_generador(lineas):
    """GENERADOR: Lee líneas una por una"""
    print("🟢 GENERADOR: Leyendo líneas una por una...")
    for linea in lineas:
        linea_procesada = linea.strip()
        print(f"   Leyendo: {linea_procesada}")
        yield linea_procesada

print("\n🔴 Usando función NORMAL:")
resultado_normal = leer_archivo_normal(lineas_archivo)
print(f"Resultado: {len(resultado_normal)} líneas")

print("\n🟢 Usando GENERADOR:")
resultado_generador = list(leer_archivo_generador(lineas_archivo))
print(f"Resultado: {len(resultado_generador)} líneas")

# ============================================================================
# DIFERENCIAS CLAVE
# ============================================================================

print("\n" + "=" * 50)
print("🎯 DIFERENCIAS CLAVE")
print("=" * 50)

print("\n🔴 FUNCIÓN NORMAL:")
print("   - Crea una lista completa en memoria")
print("   - Devuelve todos los resultados de una vez")
print("   - Usa 'return' para devolver todo")
print("   - Consume más memoria")

print("\n🟢 GENERADOR:")
print("   - Produce valores uno por uno")
print("   - No almacena todo en memoria")
print("   - Usa 'yield' para producir cada valor")
print("   - Consume menos memoria")

print("\n💡 CUÁNDO USAR CADA UNO:")
print("   🔴 Función NORMAL: Para listas pequeñas o cuando necesitas todos los datos")
print("   🟢 GENERADOR: Para listas grandes o cuando procesas datos uno por uno")

# ============================================================================
# DEMOSTRACIÓN PRÁCTICA
# ============================================================================

print("\n" + "=" * 50)
print("🚀 DEMOSTRACIÓN PRÁCTICA")
print("=" * 50)

def demostrar_memoria():
    """Demuestra la diferencia en uso de memoria"""
    
    # Función normal - crea lista completa
    print("\n🔴 Función NORMAL (1 millón de números):")
    numeros_normal = list(range(1000000))
    print(f"   Números en memoria: {len(numeros_normal)}")
    
    # Generador - no almacena nada hasta que se use
    print("\n🟢 GENERADOR (1 millón de números):")
    def numeros_generador():
        for i in range(1000000):
            yield i
    
    # Solo cuando convertimos a lista se almacenan en memoria
    numeros_gen = list(numeros_generador())
    print(f"   Números en memoria: {len(numeros_gen)}")

demostrar_memoria()

print("\n✅ ¡Concepto explicado! Los generadores son más eficientes en memoria.") 