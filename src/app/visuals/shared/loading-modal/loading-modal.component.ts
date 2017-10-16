import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent implements OnInit {

  loading: boolean = false;

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(LoadingDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.loading = result;
    });
  }

}




@Component({
  selector: 'loading-dialog',
  //templateUrl: './dialog-result-example-dialog.html',
  template: ``
})
export class LoadingDialog {
  constructor(public dialogRef: MatDialogRef<LoadingDialog>) {}
}
