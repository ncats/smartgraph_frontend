/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule,
  MatListModule, MatSliderModule, MatGridListModule, MatCardModule, MatProgressSpinnerModule,
  MatDialogModule, MatSortModule, MatTableModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatGridListModule,
    MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule],
  exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatGridListModule,
    MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule],
})
export class MaterialModule { }

