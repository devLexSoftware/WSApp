import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorInfoPageRoutingModule } from './proveedor-info-routing.module';

import { ProveedorInfoPage } from './proveedor-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorInfoPageRoutingModule
  ],
  declarations: [ProveedorInfoPage]
})
export class ProveedorInfoPageModule {}
