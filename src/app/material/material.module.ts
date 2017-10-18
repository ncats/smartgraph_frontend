/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule,
  MatListModule, MatSliderModule, MatGridListModule, MatCardModule, MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatGridListModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule],
  exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatGridListModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule],
})
export class MaterialModule { }

