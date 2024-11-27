import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./shared/pages/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
 
  {
    path: 'portadmin',
    loadChildren: () => import('./auth/portadmin/portadmin.module').then( m => m.PortadminPageModule)
  },

  {

  path: 'create-room',
  loadChildren: () => import('./auth/portadmin/create-room/create-room.module').then( m => m.CreateRoomPageModule)
  },


{
  path: 'room-list',
  loadChildren: () => import('./auth/portadmin/room-list/room-list.module').then( m => m.RoomListPageModule)
  },
  {
    path: 'formulario-r',
    loadChildren: () => import('./shared/pages/formulario-r/formulario-r.module').then( m => m.FormularioRPageModule)
  },
  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
