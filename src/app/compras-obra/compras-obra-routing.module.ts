import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasObraPage } from './compras-obra.page';

const routes: Routes = [
  {
    path: '',
    component: ComprasObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasObraPageRoutingModule {}
