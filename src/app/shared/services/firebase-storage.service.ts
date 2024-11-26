import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(
    private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  // Subir una imagen y obtener la URL
  async uploadImageAndGetUrl(file: File): Promise<string> {
    const user = await this.afAuth.currentUser; // OBTENER USER ACTUAL
    const filePath = `rooms/${user?.uid}/${Date.now()}_${file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, file);

   
    await uploadTask;

    
    const url = await fileRef.getDownloadURL().toPromise();
    return url;
  }
}
