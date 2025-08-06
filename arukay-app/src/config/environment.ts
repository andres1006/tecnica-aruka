export const environment = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  API_TIMEOUT: 10000,
} as const

export const validateEnvironment = () => {
  if (!environment.API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL no está configurado')
  }
}

// Función para obtener la URL completa de la API
export const getApiUrl = (endpoint: string = ''): string => {
  const baseUrl = environment.API_BASE_URL.replace(/\/$/, '') // Remover trailing slash
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}

export default environment 