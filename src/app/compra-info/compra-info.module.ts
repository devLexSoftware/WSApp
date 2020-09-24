import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraInfoPageRoutingModule } from './compra-info-routing.module';

import { CompraInfoPage } from './compra-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraInfoPageRoutingModule
  ],
  declarations: [CompraInfoPage]
})
export class CompraInfoPageModule {}
