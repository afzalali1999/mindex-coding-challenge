import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  public employee: Employee;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public dialog: MatDialogRef<EditDialogComponent>) { 
    this.employee = data.employee;
  }

  ngOnInit(): void {
  }

  onClickEdit() {
    this.dialog.close({ action: 'edit', data: this.employee });
  }

  onClickCancel(){
    this.dialog.close({ action:'cancel' });
  }

}
