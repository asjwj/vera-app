import { createClient } from '@supabase/supabase-js';

// KENDİ SUPABASE URL'NİZİ BURAYA KOYUN:
const supabaseUrl = 'https://rskmhgkzvufieyjemnip.supabase.co'; 

// KENDİ SUPABASE ANON KEY'İNİZİ BURAYA KOYUN:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza21oZ2t6dnVmaWV5amVtbmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTIxNzQsImV4cCI6MjA3ODAyODE3NH0.8GNfDlJqWO6j9L59pqvCi0cWlXyzRDRCPB543LONJJI'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
