import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasObraPageRoutingModule } from './compras-obra-routing.module';

import { ComprasObraPage } from './compras-obra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasObraPageRoutingModule
  ],
  declarations: [ComprasObraPage]
})
export class ComprasObraPageModule {}
