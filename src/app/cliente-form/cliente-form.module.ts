import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 

import { IonicModule } from '@ionic/angular';

import { ClienteFormPageRoutingModule } from './cliente-form-routing.module';

import { ClienteFormPage } from './cliente-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteFormPageRoutingModule,
    ReactiveFormsModule,      
  ],
  declarations: [ClienteFormPage]
})
export class ClienteFormPageModule {}
