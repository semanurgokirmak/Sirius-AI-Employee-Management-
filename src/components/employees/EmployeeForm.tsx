import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Employee } from '../../types/employee';
import { employeeSchema, EmployeeFormData } from '../../utils/validation';
import { useState, useEffect } from 'react';

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee;
  onSubmit?: (data: EmployeeFormData, employeeId?: number) => Promise<void>;
}

export const EmployeeForm = ({ isOpen, onClose, employee, onSubmit }: EmployeeFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      // İlk yükleme için boş değer olarak 'Tech' veya 'Analytics' kullanıyoruz
      department: '' as any, // Boş string ile başla, validation hata verecek ama form render edilecek
      position: '' as any, // Boş string ile başla, validation hata verecek ama form render edilecek
      dateOfBirth: undefined,
      dateOfEmployment: undefined,
    }
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
        dateOfEmployment: new Date(employee.dateOfEmployment)
      });
    } else {
      // Yeni çalışan ekleme modunda formu temizliyoruz
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        department: '' as any, // Boş string kullanıyoruz
        position: '' as any, // Boş string kullanıyoruz
        dateOfBirth: undefined,
        dateOfEmployment: undefined,
      });
    }
  }, [employee, reset]);

  const handleFormSubmit = async (data: EmployeeFormData) => {
    if (!onSubmit) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(data, employee?.id ? Number(employee.id) : undefined);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const getInputClassName = (fieldName: keyof EmployeeFormData) => {
    return `mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 
    ${errors[fieldName] 
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300'
    }`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          
          <form className="mt-4" onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Ad Soyad */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  {...register('firstName')}
                  className={getInputClassName('firstName')}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  {...register('lastName')}
                  className={getInputClassName('lastName')}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email')}
                className={getInputClassName('email')}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                {...register('phoneNumber')}
                className={getInputClassName('phoneNumber')}
                disabled={isSubmitting}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  {...register('dateOfBirth', {
                    valueAsDate: true
                  })}
                  className={getInputClassName('dateOfBirth')}
                  disabled={isSubmitting}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employment Date</label>
                <input
                  type="date"
                  {...register('dateOfEmployment', {
                    valueAsDate: true
                  })}
                  className={getInputClassName('dateOfEmployment')}
                  disabled={isSubmitting}
                />
                {errors.dateOfEmployment && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfEmployment.message}</p>
                )}
              </div>
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select 
                {...register('department')}
                className={getInputClassName('department')}
                disabled={isSubmitting}
              >
                <option value="">Select Department</option>
                <option value="Tech">Tech</option>
                <option value="Analytics">Analytics</option>
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
              )}
            </div>

            {/* Position */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select 
                {...register('position')}
                className={getInputClassName('position')}
                disabled={isSubmitting}
              >
                <option value="">Select Position</option>
                <option value="Junior">Junior</option>
                <option value="Medior">Medior</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  employee ? 'Save Changes' : 'Add Employee'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};