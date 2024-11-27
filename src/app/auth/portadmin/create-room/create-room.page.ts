import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HabitacionesService } from 'src/app/shared/services/habitaciones.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service'; 
import { ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { debounceTime, map, catchError, switchMap } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
  public roomForm!: FormGroup;
  public imageUrl: string = '';

  constructor(
    private readonly habitacionesService: HabitacionesService,
    private readonly navCtrl: NavController,
    private readonly loadingSrv: LoadingService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly route: ActivatedRoute,
    private readonly firebaseStorageService: FirebaseStorageService, 
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.roomForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      roomNumber: new FormControl('', [Validators.required], [this.roomNumberValidator.bind(this)]),
      description: new FormControl('', [Validators.required]),
      pricePerNight: new FormControl('', [Validators.required]),
      pricePerDay: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  private roomNumberValidator(control: AbstractControl) {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(value => this.habitacionesService.isRoomNumberUnique(value)),
      map(isUnique => (isUnique ? null : { roomNumberNotUnique: true })),
      catchError(() => of(null))
    );
  }

  //SUBIR IMAGEN A STORAGE FIREBASE Y ACTUALIZAR
  public async uploadImage(event: any) {
    const image = event.target.files[0];
    if (!image) {
      this.toastService.presentErrorToast('Por favor selecciona una imagen.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(image.type)) {
      this.toastService.presentErrorToast('El formato de imagen no es válido. Usa JPG, PNG o GIF.');
      return;
    }

    if (image.size > 5 * 1024 * 1024) { 
      this.toastService.presentErrorToast('La imagen es demasiado grande. Tamaño máximo: 5 MB.');
      return;
    }

    try {
      const imageUrl = await this.firebaseStorageService.uploadImageAndGetUrl(image); 
      this.imageUrl = imageUrl;
      this.roomForm.get('image')?.setValue(imageUrl);
      this.toastService.presentToast('Imagen cargada correctamente.', 2000, 'top');
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      this.toastService.presentErrorToast('Error al cargar la imagen. Intenta nuevamente.');
    }
  }

 
  public async createRoom() {
    if (this.roomForm.invalid) {
      this.toastService.presentErrorToast('Por favor, llena todos los campos correctamente.');
      return;
    }

    try {
      await this.loadingSrv.show();

      const roomNumber = this.roomForm.get('roomNumber')?.value;

      const isUnique = await this.habitacionesService.isRoomNumberUnique(roomNumber);

      if (!isUnique) {
        this.toastService.presentErrorToast('El número de habitación ya está registrado. Por favor, elige otro.');
        await this.loadingSrv.dimiss();
        return;
      }

      const uidUsuario = await this.authService.getCurrentUid();

      const habitacionData = {
        name: this.roomForm.get('name')?.value,
        roomNumber,
        description: this.roomForm.get('description')?.value,
        pricePerNight: this.roomForm.get('pricePerNight')?.value,
        pricePerDay: this.roomForm.get('pricePerDay')?.value,
        image: this.imageUrl, 
      };

      console.log('Datos de la habitación:', habitacionData);

      await this.habitacionesService.registrarHabitacion(habitacionData, uidUsuario);

      this.toastService.presentToast('Habitación registrada con éxito.', 2000, 'top');
      this.navCtrl.navigateForward('/admin-dashboard');
      await this.loadingSrv.dimiss();
    } catch (error) {
      console.error('Error al registrar la habitación:', error);
      await this.loadingSrv.dimiss();
      this.toastService.presentErrorToast('Error al registrar la habitación. Intenta de nuevo.');
    }
  }
}
