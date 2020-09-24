import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorInfoPage } from './proveedor-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorInfoPageRoutingModule {}
