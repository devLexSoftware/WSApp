import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoInfoPageRoutingModule } from './empleado-info-routing.module';

import { EmpleadoInfoPage } from './empleado-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoInfoPageRoutingModule
  ],
  declarations: [EmpleadoInfoPage]
})
export class EmpleadoInfoPageModule {}
