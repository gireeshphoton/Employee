import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.interface';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should create an employee', () => {
    const employee: Employee = { id: '1', name: 'Gireesh', position: 'Developer', salary: 5000 };
    expect(service.create(employee)).toEqual(employee);
  });

  it('should find all employees', () => {
    expect(service.findAll()).toEqual([]);
  });

  it('should find an employee by id', () => {
    const employee: Employee = { id: '1', name: 'Gireesh', position: 'Developer', salary: 5000 };
    service.create(employee);
    expect(service.findOne('1')).toEqual(employee);
  });

  it('should update an employee', () => {
    const employee: Employee = { id: '1', name: 'Gireesh', position: 'Developer', salary: 5000 };
    service.create(employee);
    const updatedEmployee: Employee = { id: '1', name: 'Gireesh Hiremath', position: 'Senior Developer', salary: 6000 };
    expect(service.update('1', updatedEmployee)).toEqual(updatedEmployee);
  });

  it('should delete an employee', () => {
    const employee: Employee = { id: '1', name: 'Gireesh', position: 'Developer', salary: 5000 };
    service.create(employee);
    service.delete('1');
    expect(() => service.findOne('1')).toThrowError('Employee not found');
  });
});
