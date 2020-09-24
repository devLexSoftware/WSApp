import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 


import { IonicModule } from '@ionic/angular';

import { ObraFormPageRoutingModule } from './obra-form-routing.module';

import { ObraFormPage } from './obra-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObraFormPageRoutingModule,
    ReactiveFormsModule,      

  ],
  declarations: [ObraFormPage]
})
export class ObraFormPageModule {}
