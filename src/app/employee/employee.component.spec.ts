import {async, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

import {EmployeeComponent} from './employee.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({selector: 'app-mat-card', template: ''})
class CardComponent {
}

@Component({selector: 'app-mat-card-header', template: ''})
class CardHeaderComponent {
}

@Component({selector: 'app-mat-card-title', template: ''})
class CardTitleComponent {
}

@Component({selector: 'app-mat-card-subtitle', template: ''})
class CardSubtitleComponent {
}

@Component({selector: 'app-mat-card-content', template: ''})
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardSubtitleComponent,
        CardContentComponent
      ],
      imports: [ MatDialogModule ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));

  it('should get direct reports', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;

    comp.employees = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'McGee',
        position: 'CEO',
        directReports: [2, 3]
      },
      {
        id: 2,
        firstName: 'Homer',
        lastName: 'Thompson',
        position: 'Dev Manager',
        directReports: [4]
      },
      {
        id: 3,
        firstName: 'Rock',
        lastName: 'Strongo',
        position: 'Lead Tester'
      },
      {
        id: 4,
        firstName: 'Max',
        lastName: 'Power',
        position: 'Junior Software Engineer'
      }
    ];

    expect(comp.getDirectReports(1)).toEqual(3);
  })
});
