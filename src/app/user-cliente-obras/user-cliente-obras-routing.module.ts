import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserClienteObrasPage } from './user-cliente-obras.page';

const routes: Routes = [
  {
    path: '',
    component: UserClienteObrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserClienteObrasPageRoutingModule {}
