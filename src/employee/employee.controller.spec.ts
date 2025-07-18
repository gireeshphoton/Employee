import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.interface';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const mockEmployeeService = {
    create: jest.fn((employee: Employee) => employee),
    findAll: jest.fn(() => []),
    findOne: jest.fn((id: string) => ({ id, name: 'gireesh', position: 'Developer', salary: 5000 })),
    update: jest.fn((id: string, updatedEmployee: Partial<Employee>) => ({ id, ...updatedEmployee })),
    delete: jest.fn((id: string) => {}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should create an employee', () => {
    const employee: Employee = { id: '1', name: 'gireesh', position: 'Developer', salary: 5000 };
    expect(controller.create(employee)).toEqual(employee);
    expect(service.create).toHaveBeenCalledWith(employee);
  });

  it('should find all employees', () => {
    expect(controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find an employee by id', () => {
    const id = '1';
    expect(controller.findOne(id)).toEqual({ id, name: 'gireesh', position: 'Developer', salary: 5000 });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update an employee', () => {
    const id = '1';
    const updatedEmployee: Partial<Employee> = { name: 'gireesh hiremath', position: 'Senior Developer', salary: 6000 };
    expect(controller.update(id, updatedEmployee)).toEqual({ id, ...updatedEmployee });
    expect(service.update).toHaveBeenCalledWith(id, updatedEmployee);
  });

  it('should delete an employee', () => {
    const id = '1';
    controller.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
