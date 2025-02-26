import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee } from "../../types/employee";
import { EmployeeForm } from "./EmployeeForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { employeeApi } from "../../api/employeeApi";
import toast from "react-hot-toast";
import { useEmployeeStore } from "../../store/employeeStore";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../ui/Icons";

export const EmployeeList = () => {
  // Query Client'ı alıyoruz
  const queryClient = useQueryClient();

  // Zustand store'dan state ve action'ları alıyoruz
  const {
    isFormOpen,
    selectedEmployee,
    isDeleteModalOpen,
    employeeToDelete,
    openForm,
    closeForm,
    selectEmployee,
    openDeleteModal,
    closeDeleteModal,
    deleteEmployee,
  } = useEmployeeStore();

  // Yerel state sadece pagination için kullanılıyor
  const [currentPage, setCurrentPage] = useState(1);

  // TanStack Query ile veri çekme
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const employees = await employeeApi.getEmployees();
        // API'den string olarak gelen tarihleri Date objelerine çeviriyoruz
        return employees.map((employee) => ({
          ...employee,
          dateOfBirth: new Date(employee.dateOfBirth),
          dateOfEmployment: new Date(employee.dateOfEmployment),
        }));
      } catch (error) {
        toast.error("Failed to load employees");
        throw error;
      }
    },
  });

  // API'den gelen veriler
  const employees: Employee[] = data;

  // Pagination değerleri
  const itemsPerPage = 5;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  // Handler fonksiyonları
  const handleEdit = (employee: Employee) => {
    selectEmployee(employee);
  };

  const handleDelete = (employee: Employee) => {
    openDeleteModal(employee);
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete?.id) {
      await deleteEmployee(String(employeeToDelete.id));
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Employees
          {!isLoading && (
            <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              ({employees.length})
            </span>
          )}
        </h1>
        <button
          onClick={openForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                    dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <AddIcon />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Error loading employees. Please try again.
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white dark:bg-dark-paper rounded-xl shadow-card dark:shadow-card-dark overflow-hidden transition-colors duration-200">
        {/* Loading State */}
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-dark-card rounded w-full"></div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="py-3 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-dark-card rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-dark-card rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {employees.length === 0 ? (
              <div className="p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No employees found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-5">
                  Get started by adding your first employee.
                </p>
                <button
                  onClick={openForm}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                            dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                  <AddIcon />
                  <span>Add New Employee</span>
                </button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                    <thead className="bg-gray-50 dark:bg-dark-card">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-dark-border">
                      {currentEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          className="hover:bg-gray-50 dark:hover:bg-dark-card/50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-1">
                              {employee.email} • {employee.department} •{" "}
                              {employee.position}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {employee.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                employee.department === "Tech"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                              }`}
                            >
                              {employee.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                            {employee.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex-shrink-0">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(employee)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => handleDelete(employee)}
                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                                aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-white dark:bg-dark-paper px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-dark-border sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.max(page - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 transition-colors"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((page) => Math.min(page + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 transition-colors"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {employees.length > 0 ? startIndex + 1 : 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {Math.min(endIndex, employees.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {employees.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() =>
                            setCurrentPage((page) => Math.max(page - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 transition-colors"
                          aria-label="Previous page"
                        >
                          <ChevronLeftIcon />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                              currentPage === index + 1
                                ? "z-10 bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                                : "bg-white dark:bg-dark-card border-gray-300 dark:border-dark-border text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border"
                            }`}
                            aria-label={`Page ${index + 1}`}
                            aria-current={
                              currentPage === index + 1 ? "page" : undefined
                            }
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentPage((page) =>
                              Math.min(page + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border disabled:opacity-50 transition-colors"
                          aria-label="Next page"
                        >
                          <ChevronRightIcon />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <EmployeeForm
        isOpen={isFormOpen}
        onClose={closeForm}
        employee={selectedEmployee}
      />
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        employeeName={
          employeeToDelete
            ? `${employeeToDelete.firstName} ${employeeToDelete.lastName}`
            : ""
        }
        isDeleting={false}
      />
    </div>
  );
};
