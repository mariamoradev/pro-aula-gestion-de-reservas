import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importamos el plugin de Camera

import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { ToastService } from 'src/app/shared/services/toast.service';

// Importamos la interfaz User
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phone!: FormControl;
  public image!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  public id: string = "";

  constructor(
    private readonly authSrv: AuthService,
    private readonly navCtrl: NavController,
    private readonly loadingSrv: LoadingService,
    private readonly angularFire: AngularFirestore,
    private readonly supabase: SupabaseService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) this.fillFormForUpdate();
    });
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);
    this.image = new FormControl('');
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      image: this.image,
      email: this.email,
      password: this.password
    });
  }

  public async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt, // Permite elegir entre cámara o galería
    });

    // Asignamos la imagen tomada al formulario
    this.registerForm.patchValue({
      image: image.dataUrl
    });
  }

  public async doRegister() {
    try {
      await this.loadingSrv.show();
      const { email, password, image } = this.registerForm.value;
      const response: any = await this.authSrv.register(email, password);
      const userID = response.user?.uid;
      if (!userID) throw new Error('Failed to get user ID.');

      let imageUrl = "";
      if (image) {
        imageUrl = await this.supabase.uploadFileAndGetUrl(image);
      }

      // Guardamos la información del usuario
      await this.angularFire.collection('users').doc(userID).set({
        name: this.registerForm.get('name')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        age: this.registerForm.get('age')?.value,
        phone: this.registerForm.get('phone')?.value,
        image: imageUrl,
        email: this.registerForm.get('email')?.value
      });

      this.toastService.presentToast('Registration successful, welcome!', 2000, 'top');
      this.navCtrl.navigateForward("/login");
      await this.loadingSrv.dimiss();
    } catch (error) {
      console.error(error);
      await this.loadingSrv.dimiss();
      this.toastService.presentErrorToast('Registration failed. Please try again.');
    }
  }

  public async doUpdate() {
    try {
      await this.loadingSrv.show();
      const { image } = this.registerForm.value;

      let imageUrl = '';
      if (image && typeof image !== 'string') {
        imageUrl = await this.supabase.uploadFileAndGetUrl(image);
      } else {
        const userDoc = await lastValueFrom(this.angularFire.collection('users').doc(this.id).get());
        const userData = userDoc?.data() as User;
        imageUrl = userData?.image || '';  
      }

      await this.angularFire.collection('users').doc(this.id).update({
        name: this.registerForm.get('name')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        age: this.registerForm.get('age')?.value,
        phone: this.registerForm.get('phone')?.value,
        image: imageUrl  
      });

      this.toastService.presentToast('Datos actualizados con éxito.', 2000, 'top');
      this.navCtrl.navigateForward('/profile');
      await this.loadingSrv.dimiss();
    } catch (error) {
      console.error(error);
      await this.loadingSrv.dimiss();
      this.toastService.presentErrorToast('Update failed. Please try again.');
    }
  }

  private async fillFormForUpdate() {
    try {
      await this.loadingSrv.show();
      const userDoc = await lastValueFrom(this.angularFire.collection('users').doc(this.id).get());

      if (userDoc?.exists) {
        const userData = userDoc.data() as User;
        this.registerForm.patchValue(userData);
      }
      await this.loadingSrv.dimiss();
    } catch (error) {
      console.error(error);
      await this.loadingSrv.dimiss();
    }
  }
}
