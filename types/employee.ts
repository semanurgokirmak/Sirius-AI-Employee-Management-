export interface Employee{
    fisthName: string;
    lastName: string;
    dateOfEmployment : Date;
    dateOfBifth: Date;
    phoneNumber: string;
    email: string;
    department: 'Analytics' | 'Tech';
    position: 'Junior | Medior | Senior';
}

export default Employee;