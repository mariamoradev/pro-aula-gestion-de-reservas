import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioRPage } from './formulario-r.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioRPageRoutingModule {}
