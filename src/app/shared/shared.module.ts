import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './Components/logo/logo.component';
import { InputComponent } from './Components/input/input.component';
import { ButtonComponent } from './Components/button/button.component';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { LoadingService } from './services/loading.service';
import { supabase } from './services/supabase.client';
import { SupabaseService } from './services/supabase.service';
import { AvatarComponent } from './Components/avatar/avatar.component';


const COMPONENTS = [
  HeaderComponent, LogoComponent, InputComponent, ButtonComponent, AvatarComponent
]

const MODULES = [ 
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  IonicModule
  
]



@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS,ReactiveFormsModule, ...MODULES],
  providers: [AuthService, ToastService, LoadingService, SupabaseService]
})
export class SharedModule { }
