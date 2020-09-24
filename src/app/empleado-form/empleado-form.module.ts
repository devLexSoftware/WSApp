import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 


import { IonicModule } from '@ionic/angular';

import { EmpleadoFormPageRoutingModule } from './empleado-form-routing.module';

import { EmpleadoFormPage } from './empleado-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoFormPageRoutingModule,
    ReactiveFormsModule,      
  ],
  declarations: [EmpleadoFormPage]
})
export class EmpleadoFormPageModule {}
