import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortadminPage } from './portadmin.page';

const routes: Routes = [
  {
    path: '',
    component: PortadminPage
  },  {
    path: 'create-room',
    loadChildren: () => import('./create-room/create-room.module').then( m => m.CreateRoomPageModule)
  },
  {
    path: 'room-list',
    loadChildren: () => import('./room-list/room-list.module').then( m => m.RoomListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortadminPageRoutingModule {}
