import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SupabaseService } from './supabase.service';
import { Habitacion } from '../models/habitacion';


@Injectable({
  providedIn: 'root',
})
export class HabitacionesService {
  constructor(
    private readonly db: AngularFirestore,
    private readonly authSrv: AuthService,
    private readonly supabaseService: SupabaseService,
    
  ) {}

  /**
   * Registrar una nueva habitación en Firebase.
   * @param habitacion Objeto con los datos de la habitación.
   * @param uidUsuario UID del usuario autenticado.
   */
  public async registrarHabitacion(habitacion: any, uidUsuario: string): Promise<void> {
    try {
      const id = habitacion.roomNumber.toString();  // Usar el roomNumber como el ID
      console.log('Datos recibidos para la habitación:', habitacion);  // Verifica los datos recibidos
      await this.db.collection('habitaciones').doc(id).set({
        ...habitacion,
        uidUsuario,  // Asocia la habitación al usuario autenticado
        createdAt: new Date().toISOString(),
      });
      console.log('Habitación registrada con éxito.');
    } catch (error) {
      console.error('Error al registrar la habitación:', error);
      throw error;
    }
  }
  

  public async isRoomNumberUnique(roomNumber: number): Promise<boolean> {
    try {
      const snapshot = await this.db.collection('habitaciones').doc(roomNumber.toString()).get().toPromise();
  
      // Verificar si snapshot está definido
      if (!snapshot) {
        console.error('No se pudo obtener el snapshot de Firebase.');
        return false; // o lanzar un error si prefieres manejarlo de otra forma
      }
  
      return !snapshot.exists;  // Si no existe el documento, el número es único
    } catch (error) {
      console.error('Error al verificar la unicidad del número de habitación:', error);
      throw error;
    }
  }
  
  
  

  public async getAllHabitaciones(): Promise<any[]> {
    try {
      const snapshot = await this.db.collection('habitaciones').get().toPromise();

      // Validar si snapshot es válido y contiene documentos
      if (!snapshot || snapshot.empty) {
        console.warn('No se encontraron habitaciones registradas.');
        return []; 
      }

      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error al obtener las habitaciones:', error);
      throw error;
    }
  }


  public async updateHabitacion(id: string, habitacion: any): Promise<void> {
    try {
      await this.db.collection('habitaciones').doc(id).update(habitacion);
    } catch (error) {
      console.error('Error al actualizar la habitación:', error);
      throw error;
    }
  }

  
 
 public async deleteHabitacion(roomNumber: string): Promise<void> {
  try {
    // Realiza una consulta para encontrar el documento con el roomNumber
    const snapshot = await this.db
      .collection('habitaciones', ref => ref.where('roomNumber', '==', roomNumber))
      .get()
      .toPromise();

    if (!snapshot || snapshot.empty) {
      throw new Error(`No se encontró una habitación con roomNumber: ${roomNumber}`);
    }

    // Obtiene el documento de la habitación y la URL de la imagen
    const docId = snapshot.docs[0].id; // SE OBTIENE EL ID DEL DOCUMENTO
    const habitacionData = snapshot.docs[0].data() as Habitacion; 
    

   

    // ELIMINA EL DOCUMENTO CORRESPONDIENTE
    await this.db.collection('habitaciones').doc(docId).delete();

    console.log(`Habitación con roomNumber ${roomNumber} eliminada correctamente.`);
  } catch (error) {
    console.error('Error al eliminar la habitación:', error);
    throw error;
  }
} 
 
}


  


