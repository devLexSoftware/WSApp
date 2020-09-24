import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraInfoPage } from './compra-info.page';

const routes: Routes = [
  {
    path: '',
    component: CompraInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraInfoPageRoutingModule {}
