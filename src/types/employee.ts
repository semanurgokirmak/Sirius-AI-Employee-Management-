export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfEmployment: Date;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  department: 'Analytics' | 'Tech';
  position: 'Junior' | 'Medior' | 'Senior';
}

export interface EmployeeFormData extends Omit<Employee, 'id'> {
  id?: number;
}