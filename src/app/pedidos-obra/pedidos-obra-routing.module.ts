import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosObraPage } from './pedidos-obra.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosObraPageRoutingModule {}
