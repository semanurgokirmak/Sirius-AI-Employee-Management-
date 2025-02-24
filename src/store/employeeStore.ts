import { create } from 'zustand';
import { Employee } from '../types/employee';
import { EmployeeFormData } from '../utils/validation';
import { employeeApi } from '../api/employeeApi';
import toast from 'react-hot-toast';

interface EmployeeState {
  // Form state
  isFormOpen: boolean;
  selectedEmployee: Employee | undefined;
  
  // Delete confirmation state
  isDeleteModalOpen: boolean;
  employeeToDelete: Employee | null;
  
  // Actions
  openForm: () => void;
  closeForm: () => void;
  selectEmployee: (employee: Employee) => void;
  openDeleteModal: (employee: Employee) => void;
  closeDeleteModal: () => void;
  
  // API actions
  createEmployee: (data: EmployeeFormData) => Promise<void>;
  updateEmployee: (data: EmployeeFormData, employeeId: string | number) => Promise<void>;
  deleteEmployee: (employeeId: string | number) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  // Initial state
  isFormOpen: false,
  selectedEmployee: undefined,
  isDeleteModalOpen: false,
  employeeToDelete: null,
  
  // UI actions
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false, selectedEmployee: undefined }),
  selectEmployee: (employee) => set({ selectedEmployee: employee, isFormOpen: true }),
  openDeleteModal: (employee) => set({ isDeleteModalOpen: true, employeeToDelete: employee }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false, employeeToDelete: null }),
  
  // API actions
  createEmployee: async (data) => {
    try {
      await employeeApi.createEmployee(data);
      set({ isFormOpen: false });
      toast.success('Employee added successfully');
    } catch (error) {
      toast.error('Failed to add employee');
      throw error;
    }
  },
  
  updateEmployee: async (data, employeeId) => {
    try {
      await employeeApi.updateEmployee(String(employeeId), data);
      set({ isFormOpen: false, selectedEmployee: undefined });
      toast.success('Employee updated successfully');
    } catch (error) {
      toast.error('Failed to update employee');
      throw error;
    }
  },
  
  deleteEmployee: async (employeeId) => {
    try {
      await employeeApi.deleteEmployee(String(employeeId));
      set({ isDeleteModalOpen: false, employeeToDelete: null });
      toast.success('Employee deleted successfully');
    } catch (error) {
      toast.error('Failed to delete employee');
      throw error;
    }
  }
}));