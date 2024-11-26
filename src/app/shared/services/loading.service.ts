import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private readonly loadingCtrl : LoadingController) { }

  public async show(message: string='Please wait...'){
    const loading =  await this.loadingCtrl.create({
      message:message,
      spinner:'crescent',
      duration: 5000
    });
    await loading.present();
  }

  public async dimiss(){
    await this.loadingCtrl.dismiss();
  }
}
