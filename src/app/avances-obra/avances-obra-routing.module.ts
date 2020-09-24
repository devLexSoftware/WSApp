import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvancesObraPage } from './avances-obra.page';

const routes: Routes = [
  {
    path: '',
    component: AvancesObraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvancesObraPageRoutingModule {}
