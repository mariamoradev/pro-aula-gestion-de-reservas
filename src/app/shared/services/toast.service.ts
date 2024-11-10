import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, duration: number = 2000, position: 'top'){
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'success',
      position
    });
    toast.present();
  }

  async presentErrorToast(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }
}