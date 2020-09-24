import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserClienteAvancePageRoutingModule } from './user-cliente-avance-routing.module';

import { UserClienteAvancePage } from './user-cliente-avance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserClienteAvancePageRoutingModule
  ],
  declarations: [UserClienteAvancePage]
})
export class UserClienteAvancePageModule {}
