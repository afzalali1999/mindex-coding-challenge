import {async, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {EmployeeListComponent} from './employee-list.component';
import {EmployeeService} from '../employee.service';
import { Employee } from '../employee';

@Component({selector: 'app-employee', template: ''})
class EmployeeComponent {
  @Input('employee') employee: any;
}

@Component({selector: 'app-mat-grid-list', template: ''})
class GridListComponent {
}

@Component({selector: 'app-mat-grid-tile', template: ''})
class GridTileComponent {
}

// const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeListComponent', () => {
  let employeeService: EmployeeService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeListComponent,
        EmployeeComponent,
        GridListComponent,
        GridTileComponent
      ],
      providers: [
        // {provide: EmployeeService, useValue: employeeServiceSpy}
        EmployeeService
      ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService);
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  }));

  it('should call the server to delete an employee if the user confirms', () => {
    const spy = spyOn(employeeService, 'remove').and.callThrough();
    const fixture = TestBed.createComponent(EmployeeListComponent);
    const comp = fixture.debugElement.componentInstance;

    const emp: Employee = {
      id: 2,
      firstName: 'Homer',
      lastName: 'Thompson',
      position: 'Dev Manager',
      directReports: [4]
    }
    comp.onDeleteEmployee(emp);

    expect(spy).toHaveBeenCalledWith(emp);
  });
});
