import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosObraPageRoutingModule } from './pedidos-obra-routing.module';

import { PedidosObraPage } from './pedidos-obra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosObraPageRoutingModule
  ],
  declarations: [PedidosObraPage]
})
export class PedidosObraPageModule {}
