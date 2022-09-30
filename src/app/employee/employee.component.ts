import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import {MatDialog} from '@angular/material/dialog';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Input() employees: Employee[] = [];
  compensation: number = 0;
  directReports: number = 0; // display direct reports number
  directReportsEmployees: Employee[] = []; // direct employees of current employee
  @Output() onDeleteEmployee = new EventEmitter<Employee>();
  @Output() onEditEmployee = new EventEmitter<Employee>();

  constructor(public dialogue: MatDialog) {
  }

  ngOnInit(): void {
    this.directReports = this.getDirectReports(this.employee.id);
    this.directReportsEmployees = this.getDirectReportsEmployees();
  }

  ngOnChanges() {
    this.directReportsEmployees = this.getDirectReportsEmployees();
    this.directReports = this.getDirectReports(this.employee.id);
  }

  // get direct reports number
  getDirectReports(employeeId: number): number {
    const emp = this.employees.find(e => e.id == employeeId);

    let sum = 0;
    if (emp.directReports !== undefined) {
      sum += emp.directReports.length;

      for (let i=0; i<emp.directReports.length; i++) {
        sum += this.getDirectReports(emp.directReports[i])
      }
    }

    return sum;
  }

  // return a list of directReports employees of an employee
  getDirectReportsEmployees(): Employee[] {
    return this.employees.filter(emp => {
      if(this.employee.directReports !== undefined && this.employee.directReports.includes(emp.id)) {
        return emp;
      }
    })
  }

  openDeleteDialog(emp: Employee) {
    const data = { 
      data: { 
        firstName: emp.firstName, 
        lastName: emp.lastName 
      } 
    }
    const dialogRef = this.dialogue.open(DeleteDialogComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteEmployee.emit(emp);
      }
    })
  }

  openEditDialog(emp: Employee) {
    const data = { 
      data: { 
        employee: { ...emp }
      } 
    }
    const dialogRef = this.dialogue.open(EditDialogComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action == 'edit') {
        this.onEditEmployee.emit(result.data);
      }
    })
  }
}
