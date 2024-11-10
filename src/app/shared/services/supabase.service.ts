import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    
    this.supabase = createClient('https://veynqxcbunipwjfpljmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleW5xeGNidW5pcHdqZnBsam1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDIwNjEsImV4cCI6MjA0NjU3ODA2MX0.JcJc4UH7DYevXiPp1ZKdwR0yMIPou7AWGLCBxlexOZM');
  }

  // Función para subir archivos y obtener la URL pública
  async uploadFileAndGetUrl(file: File): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;

    // Subir el archivo al bucket del proyect
    const { data, error } = await this.supabase.storage.from('user-profile-pictures').upload(fileName, file);

    // por si falla la subida se muestra error
    if (error) {
      throw error;
    }

    // Obtener la URL pública del archivo
    const { data: publicUrlData } = this.supabase.storage.from('user-profile-pictures').getPublicUrl(fileName);

    // Retornamos la URL pública
    return publicUrlData.publicUrl;
  }
}