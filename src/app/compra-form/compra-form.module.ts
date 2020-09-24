import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 

import { IonicModule } from '@ionic/angular';

import { CompraFormPageRoutingModule } from './compra-form-routing.module';

import { CompraFormPage } from './compra-form.page';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraFormPageRoutingModule,
    ReactiveFormsModule,      
    Ionic4DatepickerModule,    

  ],
  declarations: [CompraFormPage]
})
export class CompraFormPageModule {  
}
