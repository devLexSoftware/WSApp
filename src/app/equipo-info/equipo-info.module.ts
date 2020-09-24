import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipoInfoPageRoutingModule } from './equipo-info-routing.module';

import { EquipoInfoPage } from './equipo-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipoInfoPageRoutingModule
  ],
  declarations: [EquipoInfoPage]
})
export class EquipoInfoPageModule {}
