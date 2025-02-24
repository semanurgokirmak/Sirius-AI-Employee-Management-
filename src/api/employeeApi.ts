import { Employee } from '../types/employee';

// API'nin temel URL'ini tanımlıyoruz
const API_URL = 'http://localhost:3000/api';

export const employeeApi = {
  // Tüm çalışanları getiren fonksiyon
  getEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
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
  updateEmployee: async (id: number, employee: Partial<Employee>): Promise<Employee> => {
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
  deleteEmployee: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  },
};