/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdAutocompleteModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule,
  MdListModule, MdSliderModule, MdGridListModule, MdCardModule
} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdAutocompleteModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule, MdListModule, MdSliderModule, MdGridListModule, MdCardModule],
  exports: [MdButtonModule, MdAutocompleteModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule, MdListModule, MdSliderModule, MdGridListModule, MdCardModule],
})
export class MaterialModule { }

