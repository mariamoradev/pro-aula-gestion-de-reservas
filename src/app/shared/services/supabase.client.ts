import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://veynqxcbunipwjfpljmc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleW5xeGNidW5pcHdqZnBsam1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDIwNjEsImV4cCI6MjA0NjU3ODA2MX0.JcJc4UH7DYevXiPp1ZKdwR0yMIPou7AWGLCBxlexOZM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);




