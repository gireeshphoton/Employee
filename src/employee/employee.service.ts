import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.interface';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];

  create(employee: Employee) {
    this.employees.push(employee);
    return employee;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find(emp => emp.id === id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  update(id: string, updatedEmployee: Partial<Employee>) {
    const employeeIndex = this.employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
         throw new NotFoundException('Employee not found');
    }
    this.employees[employeeIndex] = { ...this.employees[employeeIndex], ...updatedEmployee };
    return this.employees[employeeIndex];
  }


  delete(id: string) {
    const employeeIndex = this.employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      throw new NotFoundException('Employee not found');
    }
    this.employees.splice(employeeIndex, 1);
  }
}
