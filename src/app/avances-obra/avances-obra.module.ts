import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvancesObraPageRoutingModule } from './avances-obra-routing.module';

import { AvancesObraPage } from './avances-obra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvancesObraPageRoutingModule
  ],
  declarations: [AvancesObraPage]
})
export class AvancesObraPageModule {}
