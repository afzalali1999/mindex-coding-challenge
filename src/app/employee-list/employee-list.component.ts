import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  public onDeleteEmployee(emp: Employee) {
    this.employeeService.remove(emp).subscribe(
      () => { 
        // remove deleted employee from employees
        let deletedEmployees: Employee[] = this.employees.filter(emp2 => emp2.id !== emp.id);

        // remove deleted employee id from directReports of an employee
        deletedEmployees = deletedEmployees.map(delEmp => {
          if (delEmp.directReports !== undefined && delEmp.directReports.includes(emp.id)) {
            delEmp.directReports = delEmp.directReports.filter(empId => empId !== emp.id);
            return delEmp;
          }

          return delEmp;
        })

        this.employees = deletedEmployees;
      },
      error => console.log(`onDeleteEmployee Error: ${error}`)
    );
  }

  public onEditEmployee(updatedEmp: Employee) {
    this.employeeService.save(updatedEmp).subscribe(
      () => {
        this.employees = this.employees.map(emp => {
          if (emp.id == updatedEmp.id) {
            return updatedEmp;
          }

          return emp;
        });
      }
    );
  }
}
