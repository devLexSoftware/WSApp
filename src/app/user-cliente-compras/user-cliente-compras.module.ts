import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserClienteComprasPageRoutingModule } from './user-cliente-compras-routing.module';

import { UserClienteComprasPage } from './user-cliente-compras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserClienteComprasPageRoutingModule
  ],
  declarations: [UserClienteComprasPage]
})
export class UserClienteComprasPageModule {}
