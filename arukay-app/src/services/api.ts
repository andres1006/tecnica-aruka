import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import environment from '../config/environment'

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  message: string
  status: number
  details?: unknown
}

export class ApiException extends Error {
  public status: number
  public details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.details = details
  }
}

export class ApiService {
  private client: AxiosInstance

  constructor(baseURL: string = environment.API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: environment.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response
          const message = (data as { detail?: string })?.detail || error.message
          throw new ApiException(message, status)
        }
        throw new ApiException('Error de conexión', 0)
      }
    )
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url)
      return {
        data: response.data,
        status: response.status
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: unknown): ApiException {
    if (error instanceof ApiException) {
      return error
    }

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 0
      const message = error.response?.data?.detail || error.message
      return new ApiException(message, status, error.response?.data)
    }

    return new ApiException('Error desconocido', 0)
  }
}

export const apiService = new ApiService() 