import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  email: z
    .string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  
  dateOfBirth: z
    .date()
    .max(new Date(), 'Date of birth cannot be in the future'),
  
  dateOfEmployment: z
    .date()
    .max(new Date(), 'Employment date cannot be in the future'),
  
  department: z
    .enum(['Analytics', 'Tech'], {
      errorMap: () => ({ message: 'Please select a valid department' })
    }),
  
  position: z
    .enum(['Junior', 'Medior', 'Senior'], {
      errorMap: () => ({ message: 'Please select a valid position' })
    })
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;