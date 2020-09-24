import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserClienteAvancePage } from './user-cliente-avance.page';

const routes: Routes = [
  {
    path: '',
    component: UserClienteAvancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserClienteAvancePageRoutingModule {}
