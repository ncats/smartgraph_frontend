/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule} from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule],
  exports: [MdButtonModule, MdCheckboxModule, MdMenuModule, MdToolbarModule, MdInputModule, MdIconModule],
})
export class MaterialModule { }
