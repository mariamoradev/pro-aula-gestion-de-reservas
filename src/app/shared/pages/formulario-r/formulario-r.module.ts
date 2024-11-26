import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioRPageRoutingModule } from './formulario-r-routing.module';

import { FormularioRPage } from './formulario-r.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioRPageRoutingModule
  ],
  declarations: [FormularioRPage]
})
export class FormularioRPageModule {}
