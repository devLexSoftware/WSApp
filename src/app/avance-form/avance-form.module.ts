import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 


import { IonicModule } from '@ionic/angular';

import { AvanceFormPageRoutingModule } from './avance-form-routing.module';

import { AvanceFormPage } from './avance-form.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvanceFormPageRoutingModule,
    ReactiveFormsModule,      
    Ionic4DatepickerModule,    
  ],
  declarations: [AvanceFormPage]
})
export class AvanceFormPageModule {}
