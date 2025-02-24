import { Employee } from '../types/employee';

// API'nin temel URL'ini tanımlıyoruz
const API_URL = 'http://localhost:3000/api';

// API'den dönen veri yapısı
interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

export const employeeApi = {
  // Tüm çalışanları getiren fonksiyon
  getEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_URL}/employees?page=1&limit=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    const result: ApiResponse<Employee[]> = await response.json();
    return result.data;
  },

  // Tek bir çalışanı getiren fonksiyon
  getEmployee: async (id: number): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }
    return response.json();
  },

  // Yeni çalışan ekleyen fonksiyon
  createEmployee: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    return response.json();
  },

  // Çalışan bilgilerini güncelleyen fonksiyon
  updateEmployee: async (id: string | number, employee: Partial<Employee>): Promise<Employee> => {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error('Failed to update employee');
    }
    return response.json();
  },

  // Çalışan silen fonksiyon
  deleteEmployee: async (id: string | number): Promise<void> => {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  },
};