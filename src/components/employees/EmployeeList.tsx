import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Employee } from '../../types/employee';
import { EmployeeForm } from './EmployeeForm';
import { DeleteConfirmation } from './DeleteConfirmation';
import { employeeApi } from '../../api/employeeApi';
import { EmployeeFormData } from '../../utils/validation';

export const EmployeeList = () => {
  // Query Client'ı alıyoruz - cache'i yönetmek için kullanacağız
  const queryClient = useQueryClient();
  
  // State tanımlamaları
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // TanStack Query ile veri çekme
  const {
    data = [], // Eğer data undefined ise boş array kullan
    isLoading,
    error
  } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const employees = await employeeApi.getEmployees();
      // API'den string olarak gelen tarihleri Date objelerine çeviriyoruz
      return employees.map(employee => ({
        ...employee,
        dateOfBirth: new Date(employee.dateOfBirth),
        dateOfEmployment: new Date(employee.dateOfEmployment)
      }));
    }
  });

  // Çalışan silme mutation'ı
  const deleteMutation = useMutation({
    mutationFn: (id: number) => employeeApi.deleteEmployee(id),
    onSuccess: () => {
      // Başarılı silme işleminden sonra listeyi yenile
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  });

  // API'den gelen veriler
  const employees: Employee[] = data.length > 0 ? data : [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: new Date("2023-01-15"),
      dateOfBirth: new Date("1990-05-20"),
      phoneNumber: "555-0123",
      email: "john@example.com",
      department: "Tech",
      position: "Senior"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      dateOfEmployment: new Date("2023-03-10"),
      dateOfBirth: new Date("1992-08-15"),
      phoneNumber: "555-0124",
      email: "jane@example.com",
      department: "Analytics",
      position: "Medior"
    }
  ];

  // Pagination değerleri
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  // Handler fonksiyonları
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteMutation.mutate(Number(employeeToDelete.id));
      // Modal kapatma işlemi mutation'ın onSuccess callback'inde yapılıyor
    }
  };
  
  // Form Submit Handler - ekleme ve güncelleme için
  const handleFormSubmit = async (employeeData: EmployeeFormData, employeeId?: number) => {
    try {
      if (employeeId) {
        // Güncelleme işlemi
        await employeeApi.updateEmployee(Number(employeeId), employeeData);
      } else {
        // Ekleme işlemi
        await employeeApi.createEmployee(employeeData);
      }
      
      // Cache'i yenile ve formu kapat
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setIsFormOpen(false);
      setSelectedEmployee(undefined);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
          Error loading employees. Please try again.
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Table */
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.department === 'Tech' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex-shrink-0">
                    <button 
                      onClick={() => handleEdit(employee)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 min-w-[40px]"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(employee)}
                      className="text-red-600 hover:text-red-900 min-w-[40px]"
                    >
                      {deleteMutation.isPending && employeeToDelete?.id === employee.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{employees.length > 0 ? startIndex + 1 : 0}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, employees.length)}</span> of{' '}
                  <span className="font-medium">{employees.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <EmployeeForm 
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedEmployee(undefined);
        }}
        employee={selectedEmployee}
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmation 
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDelete ? `${employeeToDelete.firstName} ${employeeToDelete.lastName}` : ''}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};