import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ziyuehkyjonnkolhcpjq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeXVlaGt5am9ubmtvbGhjcGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjYwMjYsImV4cCI6MjA1NDcwMjAyNn0.HBEsGQVDi64ink-4cZoz52DMr1sM61zUJE9we4RjP3s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
