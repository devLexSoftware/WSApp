import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 

import { IonicModule } from '@ionic/angular';

import { ProveedorFormPageRoutingModule } from './proveedor-form-routing.module';

import { ProveedorFormPage } from './proveedor-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorFormPageRoutingModule,
    ReactiveFormsModule      
  ],
  declarations: [ProveedorFormPage]
})
export class ProveedorFormPageModule {}
