import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.interface';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employee: Employee) {
    return this.employeeService.create(employee);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedEmployee: Partial<Employee>) {
    return this.employeeService.update(id, updatedEmployee);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.employeeService.delete(id);
  }
}
