import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;


 constructor(private readonly authSrv: AuthService, private readonly navCtrl: NavController, private readonly toastservice: ToastService, private readonly loadingSrv: LoadingService){
   this.initForm();
 }

 ngOnInit() {
 }

 public async doLogin(){
 try{
     await this.loadingSrv.show();
     const { email, password } = this.loginForm.value;
     await this.authSrv.Login(email, password);
     await this.loadingSrv.dimiss();
     this.navCtrl.navigateForward("reservas");
     
     this.toastservice.presentToast('Welcome, dear user', 2000, 'top');
   }catch(error){
     await this.loadingSrv.dimiss();
     this.toastservice.presentErrorToast('Invalid email or password, please try again');
   }
   
 }


 private initForm(){
   this.email = new FormControl('', [Validators.email, Validators.required]);
   this.password = new FormControl('', [Validators.required]);
   this.loginForm = new FormGroup({
     email: this.email,
     password: this.password,
   });
 }
}
