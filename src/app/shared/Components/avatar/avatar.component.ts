import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() control = new FormControl();
  @Input() onlyView = false;
  @Input() validMimeTypes: string[] = ['image/jpeg', 'image/png'];
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5 MB
  @Output() imageUploaded = new EventEmitter<string>();

  protected image: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  protected isLoading = false;
  protected errorMessage: string | null = null;

  constructor(private supabase: SupabaseService) {}

  private validateFile(file: File): boolean {
    if (!this.validMimeTypes.includes(file.type)) {
      this.errorMessage = 'Tipo de archivo no permitido. Solo JPEG y PNG son aceptados.';
      console.error(this.errorMessage);
      return false;
    }
    if (file.size > this.maxFileSize) {
      this.errorMessage = `El archivo es demasiado grande. Máximo permitido: ${this.maxFileSize / (1024 * 1024)} MB.`;
      console.error(this.errorMessage);
      return false;
    }
    return true;
  }

  public async uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file || !this.validateFile(file)) return;

    this.isLoading = true;
    this.errorMessage = null;

    try {
      this.image = await this.supabase.uploadFileAndGetUrl(file);
      this.imageUploaded.emit(this.image);
    } catch (error) {
      this.errorMessage = 'Error al subir la imagen. Intente nuevamente.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  public async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      if (!photo.webPath) throw new Error('No se obtuvo una imagen.');

      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const fileName = `${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      if (!this.validateFile(file)) return;

      this.isLoading = true;
      this.errorMessage = null;

      this.image = await this.supabase.uploadFileAndGetUrl(file);
      this.imageUploaded.emit(this.image);
    } catch (error) {
      this.errorMessage = 'Error al tomar la foto. Intente nuevamente.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
