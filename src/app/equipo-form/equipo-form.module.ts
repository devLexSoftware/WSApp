import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 


import { IonicModule } from '@ionic/angular';

import { EquipoFormPageRoutingModule } from './equipo-form-routing.module';

import { EquipoFormPage } from './equipo-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoFormPageRoutingModule,
    ReactiveFormsModule,      

  ],
  declarations: [EquipoFormPage]
})
export class EquipoFormPageModule {}
