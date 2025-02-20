import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase credentials
const SUPABASE_URL = "https://ziyuehkyjonnkolhcpjq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppeXVlaGt5am9ubmtvbGhjcGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjYwMjYsImV4cCI6MjA1NDcwMjAyNn0.HBEsGQVDi64ink-4cZoz52DMr1sM61zUJE9we4RjP3s";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
