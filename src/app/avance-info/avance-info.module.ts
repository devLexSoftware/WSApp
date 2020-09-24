import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvanceInfoPageRoutingModule } from './avance-info-routing.module';

import { AvanceInfoPage } from './avance-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvanceInfoPageRoutingModule
  ],
  declarations: [AvanceInfoPage]
})
export class AvanceInfoPageModule {}
