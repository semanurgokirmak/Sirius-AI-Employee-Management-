import { useState } from 'react';
import { Employee } from '../../types/employee';
import { EmployeeForm } from './EmployeeForm';

export const EmployeeList = () => {
  // State tanımlamaları
  const [isFormOpen, setIsFormOpen] = useState(false); //çalışan ekleme düzenleme formunun açık mı kapalı mı olduğunu kontrol eder
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined); //bilgileri düzenlenecek çalışsanın bilgilerini tutar

  // Örnek veri
  const sampleEmployees: Employee[] = [
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

  // Edit butonuna tıklandığında çalışacak fonksiyon
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee); //seçilen çalışanın bilgilerini state'e kaydeder böylece edite tıklandığında çalışanın verileri formda görülür
    setIsFormOpen(true); //form modalını açar
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button 
          onClick={() => setIsFormOpen(true)}  //tıklandığında useState true bilgisini gönder
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Employee
        </button>
      </div>

      {/* Table */}
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
            {sampleEmployees.map((employee) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleEdit(employee)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Employee Form Modal */}
      <EmployeeForm 
        isOpen={isFormOpen}  //formun açık olup olmadığını kontrol ediyor
        onClose={() => {   //form kapanınca bu fonksiyon çalışacak
          setIsFormOpen(false);  //form kapatıyor
          setSelectedEmployee(undefined); //seçili çalışanı temizliyor
        }}
        employee={selectedEmployee}  //düzenlenecek çalışan bilgisi
      />
    </div>
  );
};