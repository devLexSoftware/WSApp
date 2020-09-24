import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoFormPage } from './pedido-form.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoFormPageRoutingModule {}
