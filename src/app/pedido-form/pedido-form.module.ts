import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 

import { IonicModule } from '@ionic/angular';

import { PedidoFormPageRoutingModule } from './pedido-form-routing.module';

import { PedidoFormPage } from './pedido-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoFormPageRoutingModule,
    ReactiveFormsModule,              
  ],
  declarations: [PedidoFormPage]
})
export class PedidoFormPageModule {}
