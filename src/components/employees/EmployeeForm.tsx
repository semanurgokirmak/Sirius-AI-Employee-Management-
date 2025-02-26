import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "../../types/employee";
import { employeeSchema, EmployeeFormData } from "../../utils/validation";
import { useState, useEffect } from "react";
import { useEmployeeStore } from "../../store/employeeStore";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "../ui/Icons";

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee;
}

export const EmployeeForm = ({
  isOpen,
  onClose,
  employee,
}: EmployeeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Zustand store'dan action'ları alıyoruz
  const { createEmployee, updateEmployee } = useEmployeeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  // Employee değiştiğinde formu resetliyoruz
  useEffect(() => {
    if (employee) {
      // Tüm değerleri set ediyoruz
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        department: employee.department,
        position: employee.position,
        dateOfBirth: new Date(employee.dateOfBirth),
        dateOfEmployment: new Date(employee.dateOfEmployment),
      });
    } else {
      // Yeni çalışan ekleme modunda formu temizliyoruz
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        department: "" as unknown as "Analytics" | "Tech",
        position: "" as unknown as "Junior" | "Medior" | "Senior",
        dateOfBirth: undefined,
        dateOfEmployment: undefined,
      });
    }
  }, [employee, reset]);

  const handleFormSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      if (employee?.id) {
        // Güncelleme işlemi
        await updateEmployee(data, String(employee.id));
      } else {
        // Ekleme işlemi
        await createEmployee(data);
      }

      // Cache'i yenile
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const getInputClassName = (fieldName: keyof EmployeeFormData) => {
    const baseClasses =
      "mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-card border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100 transition-all duration-150 ease-in-out";

    return errors[fieldName]
      ? `${baseClasses} border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500 dark:placeholder-red-300`
      : `${baseClasses} border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400`;
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (isSubmitting) return;
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative top-20 mx-auto p-0 max-w-md animate-fadeIn">
        <div className="bg-white dark:bg-dark-paper rounded-lg shadow-card dark:shadow-card-dark overflow-hidden transition-all duration-200">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {employee ? "Edit Employee" : "Add New Employee"}
            </h3>
          </div>

          <form className="px-6 py-4" onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Ad Soyad */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={getInputClassName("firstName")}
                  disabled={isSubmitting}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={getInputClassName("lastName")}
                  disabled={isSubmitting}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={getInputClassName("email")}
                disabled={isSubmitting}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={getInputClassName("phoneNumber")}
                disabled={isSubmitting}
                placeholder="+1234567890"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth", {
                    valueAsDate: true,
                  })}
                  className={getInputClassName("dateOfBirth")}
                  disabled={isSubmitting}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Employment Date
                </label>
                <input
                  type="date"
                  {...register("dateOfEmployment", {
                    valueAsDate: true,
                  })}
                  className={getInputClassName("dateOfEmployment")}
                  disabled={isSubmitting}
                />
                {errors.dateOfEmployment && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.dateOfEmployment.message}
                  </p>
                )}
              </div>
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                {...register("department")}
                className={getInputClassName("department")}
                disabled={isSubmitting}
              >
                <option value="">Select Department</option>
                <option value="Tech">Tech</option>
                <option value="Analytics">Analytics</option>
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.department.message}
                </p>
              )}
            </div>

            {/* Position */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position
              </label>
              <select
                {...register("position")}
                className={getInputClassName("position")}
                disabled={isSubmitting}
              >
                <option value="">Select Position</option>
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6 border-t dark:border-dark-border pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-card border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-dark-border transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : employee ? (
                  "Save Changes"
                ) : (
                  "Add Employee"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
