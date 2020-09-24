import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserClienteObrasPageRoutingModule } from './user-cliente-obras-routing.module';

import { UserClienteObrasPage } from './user-cliente-obras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserClienteObrasPageRoutingModule
  ],
  declarations: [UserClienteObrasPage]
})
export class UserClienteObrasPageModule {}
