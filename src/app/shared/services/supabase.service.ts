import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://veynqxcbunipwjfpljmc.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleW5xeGNidW5pcHdqZnBsam1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDIwNjEsImV4cCI6MjA0NjU3ODA2MX0.JcJc4UH7DYevXiPp1ZKdwR0yMIPou7AWGLCBxlexOZM'
    );
  }

  
  async uploadUserImageAndGetUrl(file: File): Promise<string> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await this.supabase.storage
        .from('user-profile-pictures')
        .upload(fileName, file);
  
      if (uploadError) {
        console.error('Error al subir la imagen:', uploadError);
        throw new Error('No se pudo subir la imagen. Intenta nuevamente.');
      }
  

      const { data: publicUrlData } = this.supabase.storage
        .from('user-profile-pictures')
        .getPublicUrl(fileName);
  
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('La URL generada es inválida o está vacía.');
      }
  
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error en uploadUserImageAndGetUrl:', error);
      throw error;
    }
  }


  async uploadFileAndGetUrl(file: File): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;

    // Subir el archivo al bucket del proyecto
    const { data, error } = await this.supabase.storage.from('user-profile-pictures').upload(fileName, file);

    if (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file.");
    }

    // Obtener la URL pública del archivo
    const { data: publicUrlData } = this.supabase.storage.from('user-profile-pictures').getPublicUrl(fileName);

    // Retornamos la URL pública
    return publicUrlData.publicUrl;
  }

  

  }
  
  







