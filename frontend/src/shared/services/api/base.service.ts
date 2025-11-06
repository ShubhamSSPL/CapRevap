/**
 * Base API Service
 * Handles all HTTP requests with interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors() {
    // Request Interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if exists
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add degree configuration
        const degreeCode = localStorage.getItem('selectedDegree');
        if (degreeCode) {
          config.headers['X-Degree-Code'] = degreeCode;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response) => {
        // Return data directly
        return response.data;
      },
      async (error: AxiosError) => {
        // Handle specific error status codes
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem('token');
              window.location.href = '/login';
              break;

            case 403:
              // Forbidden
              console.error('Access forbidden');
              break;

            case 404:
              // Not found
              console.error('Resource not found');
              break;

            case 500:
              // Server error
              console.error('Server error occurred');
              break;

            default:
              console.error('API Error:', error.response.status);
          }
        } else if (error.request) {
          // Network error
          console.error('Network error - please check your connection');
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   */
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.get(url, config);
  }

  /**
   * POST request
   */
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.post(url, data, config);
  }

  /**
   * PUT request
   */
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.put(url, data, config);
  }

  /**
   * PATCH request
   */
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.api.patch(url, data, config);
  }

  /**
   * DELETE request
   */
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.delete(url, config);
  }

  /**
   * File upload
   */
  upload<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  }
}

export const apiService = new ApiService();
