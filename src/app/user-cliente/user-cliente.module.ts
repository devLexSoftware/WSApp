import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserClientePageRoutingModule } from './user-cliente-routing.module';

import { UserClientePage } from './user-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserClientePageRoutingModule
  ],
  declarations: [UserClientePage]
})
export class UserClientePageModule {}
