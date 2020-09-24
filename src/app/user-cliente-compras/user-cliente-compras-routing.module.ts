import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserClienteComprasPage } from './user-cliente-compras.page';

const routes: Routes = [
  {
    path: '',
    component: UserClienteComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserClienteComprasPageRoutingModule {}
